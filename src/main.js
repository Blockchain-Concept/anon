 var web3js, anonimizer, _allSuccess, _allRollback, _birthdayService;
 var _optionsActual = { 
        stateWaitIntervalTime:0, // = 1 days // 30мин и < 48 часов // время, которое даётся на отправку всеми участниками адресов для получения и подтверждений об отправке этих адресов (можно: seconds, minutes, hours, days, weeks and years)sendRecipient
        mixingQuantity:0, // = 1 эфир //размер перемешиваемого значения. Т.е. сумма, которая будет отправляться и получаться на кошельки участников
        ownerRewardValue:0, // размер комиссии - % от mixingQuantity, которую платят с кошелька получения и которую забирает владелец смартконтракта и сам смарт контракт на отправку по итоговым адресам (получателям или возврат отправителям). Если газ превысит комиссию то он вычитается из анонимизируемой единицы эфира
        stateCheckCommision:0, // маленькая плата за проверку и смену текущего статуса. для начала будет почти нулевой. Если будут проблемы - можно сделать очень большой
        pullSize:"", // = 10; //количество адресов для перемешивания        
        changedDate:0, // дата и время последнего изменения
        needToActualize:0, // признак были ли использованы текущие плановые данные для изменения актуальных, или нет. false - настройки актуальны. true - запланировано изменение настроек и требуется актуализация
 };
 var _optionsPlanning = { 
        stateWaitIntervalTime:"", // = 1 days // 30мин и < 48 часов // время, которое даётся на отправку всеми участниками адресов для получения и подтверждений об отправке этих адресов (можно: seconds, minutes, hours, days, weeks and years)sendRecipient
        mixingQuantity:"", // = 1 эфир //размер перемешиваемого значения. Т.е. сумма, которая будет отправляться и получаться на кошельки участников
        ownerRewardValue:"", // размер комиссии - % от mixingQuantity, которую платят с кошелька получения и которую забирает владелец смартконтракта и сам смарт контракт на отправку по итоговым адресам (получателям или возврат отправителям). Если газ превысит комиссию то он вычитается из анонимизируемой единицы эфира
        stateCheckCommision:"", // маленькая плата за проверку и смену текущего статуса. для начала будет почти нулевой. Если будут проблемы - можно сделать очень большой
        pullSize:"", // = 10; //количество адресов для перемешивания        
        changedDate:"", // дата и время последнего изменения
        needToActualize:0, // признак были ли использованы текущие плановые данные для изменения актуальных, или нет. false - настройки актуальны. true - запланировано изменение настроек и требуется актуализация
 };
// *********************************************** //
// ********* основная функциональность *********** //
// *********************************************** //
//1) добавление нового участника и если это последний участник, то переход на новый этап (смена статуса, фиксация времени)
function iWantMixETH(){
	var _result;
	alert("in metamask, use the wallet from which you will send money");
	anonimizer.methods.iWantMixETH().send().then(_result = true, (errorReason) => {});
}

//2) удаление самим участникам своего участия на первом этапе. И если участников не осталось, то вызов функции актуализации параметров changeActualOptions
function iWantRemove(){
	var _result;
	alert("in metamask, use the wallet from which you sent money in the first step");
	_result = confirm("you confirm that you want to withdraw from participation and take your money");
	if (_result == true){
		anonimizer.methods.iWantRemove().send().then(_result = true, (errorReason) => {});
	}
}
//3) добавление нового кошелька для получения (предварительно проверить статус. Если это последний кошелёк для получения, 
//        то сменить статус на sendConfirm). Если это не последний адрес получателя, а время на отправку кошельков-получателей вышло, то вызов
//        функций 1) переход на начальное пустое состояние и 2) возврата изначальных денег 
function sendRecipient(){
	var _result;
	_result = confirm("Do you confirm that your use the wallet to which you plan to receive the money transfer");
	if (_result == true){
		anonimizer.methods.sendRecipient().send().then(_result = true, (errorReason) => {});
	}
}
//4) добавление пометки о том, что кошелёк для получения был добавлен. Если это последнее подтверждение, 
//        то отправка всем кошелькам получателям их денег - вызов функции 3). Если не последний, то проверка на истечение общего времени на подтверждения
//        и в случае истечения вызов функций 1) переход на начальное пустое состояние и 2) возврата изначальных денег 
function setConfirmMark(){
	var _result;
	alert("in metamask, use the wallet from which you sent money in the first step");
	_result = confirm("Do you confirm that your wallet for receiving is in the list of wallets for receiving? (that you added it in the second step)");
	if (_result == true){
		anonimizer.methods.setConfirmMark().send().then(_result = true, (errorReason) => {});
	}
}
//5) проверка любым желающим продолжительности актуального состояния отправки подтверждений или отправки адреса получения, 
function checkState(){
	var _result;
	_result = confirm("Attention! a commission is charged for this operation");
	if (_result == true){
		_result = false; 
		anonimizer.methods.stateCheck().send().then(_result = true, (errorReason) => {});
	}	
	return _result;
}
// **************************************** //
// ********* функции статистики *********** //
// ********************************начало** //
// сколько отправителей
function checkSendersAmount(){
	var _sendersAmount;
	anonimizer.methods.lostTransfersCheck().call().then((value) => {_sendersAmount = value;}, (errorReason) => {});
	return _sendersAmount;
}
// сколько получателей
function checkReceiversAmount(){
	var _receiversAmount;
	anonimizer.methods.lostTransfersCheck().call().then((value) => {_receiversAmount = value;}, (errorReason) => {});
	return _receiversAmount;
}
// сколько подтверждений отправки кошелька для получений
function checkConfirmsAmount(){
	var _confirmsAmount;
	anonimizer.methods.lostTransfersCheck().call().then((value) => {_confirmsAmount = value;}, (errorReason) => {});
	return _confirmsAmount;
}
// посмотреть не попал ли свой кошелёк в список с ошибками выплат
function checkLostTransfer(){
	var _isLostTransfer;
	anonimizer.methods.lostTransfersCheck().call().then((value) => {_isLostTransfer = value;}, (errorReason) => {});
	return _isLostTransfer;
}
function getAllSuccess(){
	var _amount;
	anonimizer.methods.allSuccess().call().then((value) => {document.getElementById('success').innerText = value;_allSuccess =  value;}, (errorReason) => {});
	return _amount;
}
function getAllRollback(){
	var _amount;
	anonimizer.methods.allRollback().call().then((value) => {document.getElementById('rollBack').innerText = value;_allRollback =  value;}, (errorReason) => {});
	return _amount;
}
function getbirthdayService(){
	var _amount;
	anonimizer.methods.birthdayService().call().then((value) => {document.getElementById('switchOnTime').innerText = convertDateToNormal(value);_birthdayService =  value;}, (errorReason) => {});
	return _amount;
}
///////получение всех настроек сервиса (текущих и плановых)
function getAllOptions(){
//	anonimizer.methods.optionsActual().call().then((value) => {_optionsActual = value; optionsUpdate();}, (errorReason) => {});
	anonimizer.methods.optionsActual().call().then((value) => {
		_optionsActual = value; 
		if (_optionsActual.needToActualize){
			anonimizer.methods.optionsPlanning().call().then((value) => {_optionsPlanning = value; optionsUpdate();}, (errorReason) => {});
		} else{
			optionsUpdate();
		}	
	}, (errorReason) => {});
}
///////получение активного кошелька в метамаск
async function getActiveWallet(){
let myBalanceWei;
let balance;
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await web3js.eth.getBalance(account).then(bal => balance = bal);
	balance = web3js.utils.fromWei(balance, 'ether');
	balance = Math.round(balance*100)/100;
    document.getElementById('curWallet').innerHTML = account + " <br>( " + balance + ' ETH )';
    window.ethereum.on('accountsChanged', function (accounts) { document.getElementById('curWallet').innerText = account; });
}	
function getState() { 
	anonimizer.methods.state().call().then((value) => {document.getElementById('step').innerText = value}, (errorReason) => {});
	return false;
}	
function sendMessage() { 
	anonimizer.methods.ownersMessages(1).call().then((value) => {alert(value);}, (errorReason) => {alert('333');});
return false;
}
////////чтение событий
function getLog(){
var event = anonimizer.optionsChanged(function(error, result){
    for(let key in result){
		document.getElementById('m-log-body').innerHTML = document.getElementById('m-log-body').innerHTML + key + " : " + result[key] + "<br>"
    }
});	
	
	
	
// stateChanged
// moneySentSuccessfully
// moneyRollback
// optionsChanged
// addItemToList
// remItemFromMembersList
// служебные функции	
//	anonimizer.events.
//	myContract.events.MyEvent({ fromBlock: 0, })
}







// *****************************окончание** // 
// ********* функции статистики *********** //
// **************************************** //
 
// **************************************** // 
// ********* вспомогательные функции******* //
// *****************************начало***** //
///////получение даты разворачивания смартконтракта
function convertDateToNormal(_timestamp){
	if (_timestamp != 0){
		const date = new Date(_timestamp * 1000);
		var _month = date.getMonth()+1;
		var _dateVal = date.getDate() + '.' + _month + '.' + date.getFullYear();
		return _dateVal;
	} else{
		return "";
	}
} 
/////// перерисовка начитанных настроек смартконтракта
function optionsUpdate(){
	document.getElementById('stateWaitIntervalTime').innerText = timeDiff(0, _optionsActual.stateWaitIntervalTime, "hours");
	document.getElementById('mixingQuantity').innerText = web3js.utils.fromWei(_optionsActual.mixingQuantity, 'ether');
	document.getElementById('ownerRewardValue').innerText = web3js.utils.fromWei(_optionsActual.ownerRewardValue, 'ether');
	document.getElementById('stateCheckCommision').innerText = web3js.utils.fromWei(_optionsActual.stateCheckCommision, 'ether');
	document.getElementById('pullSize').innerText = _optionsActual.pullSize;
	document.getElementById('changedDate').innerText = convertDateToNormal(_optionsActual.changedDate);
	if ( _optionsActual.needToActualize == true){
		document.getElementById('stateWaitIntervalTime_plan').innerText = timeDiff(0, _optionsPlanning.stateWaitIntervalTime, "hours");
		document.getElementById('mixingQuantity_plan').innerText = web3js.utils.fromWei(_optionsPlanning.mixingQuantity, 'ether');
		document.getElementById('ownerRewardValue_plan').innerText = web3js.utils.fromWei(_optionsPlanning.ownerRewardValue, 'ether');
		document.getElementById('stateCheckCommision_plan').innerText = web3js.utils.fromWei(_optionsPlanning.stateCheckCommision, 'ether');
		document.getElementById('pullSize_plan').innerText = _optionsPlanning.pullSize;
		document.getElementById('changedDate_plan').innerText = convertDateToNormal(_optionsPlanning.changedDate);
	}else{
		document.getElementById('stateWaitIntervalTime_plan').innerText = "";
		document.getElementById('mixingQuantity_plan').innerText = "";
		document.getElementById('ownerRewardValue_plan').innerText = "";
		document.getElementById('stateCheckCommision_plan').innerText = "";
		document.getElementById('pullSize_plan').innerText = "";
		document.getElementById('changedDate_plan').innerText ="";
	}	
}
/////// получение по разнице дат в миллисекундах полных значений в нормальных ед измерения (днях, часах и т.д.). date2 > date1; interval - одно из: years, months, weeks, days, hours, minutes, seconds
function timeDiff(_date1,_date2,_interval) {
    let second=1, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    let date1 = new Date(_date1);
    let date2 = new Date(_date2);
    //let timediff = date2 - date1;
	let timediff = _date2 - _date1;
    if (isNaN(timediff)){return NaN};
    switch (_interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (( date2.getFullYear() * 12 + date2.getMonth() ) - ( date1.getFullYear() * 12 + date1.getMonth() ));
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}
/////// получение читабельной строки по разнице дат в милли секундах
function timeDiffString(_date) {
	let _str, _y, _m, _w, _d, _h, _s;
    let date1 = new Date(0);
    let date2 = new Date(_date);	
	let timediff = date2 - date1;
	let second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    _y = date2.getFullYear() - date1.getFullYear();
	_m = ( date2.getFullYear() * 12 + date2.getMonth() ) - ( date1.getFullYear() * 12 + date1.getMonth()) - _y * 12;
	_ms= Math.ceil(timediff % 1000),
	_s = Math.ceil(timediff / 1000 % 60),
	_m = Math.ceil(timediff / 60000 % 60),
	_h = Math.ceil(timediff / 3600000 % 24),
	_d = Math.ceil(timediff / 86400000)
	if (_d > 0){_str = _d + 'д.'};
	if (_h > 0){_str = ' ' + _h + 'ч.'};
	if (_m > 0){_str = ' ' + _m + 'мин.'};
	if (_s > 0){_str = ' ' + _s + 'сек.'};
	_str = 'осталось: ' + _str;
return _str;
}
///////
///////
///////
///////



// *****************************окончание** // 
// ********* вспомогательные функции******* //
// **************************************** //    
 
// **************************************** //
// основная функциональность //
// **************************************** //
 function startApp(){
	var anonimizerAddress = "0x80Fa4E68804d5c0e52ccCed7FbB59EF4102b0f53";
	anonimizer = new web3js.eth.Contract(anonABI, anonimizerAddress);
	getAllOptions();
	getAllSuccess();
	getAllRollback();
	getbirthdayService();
	getActiveWallet();   
	getState();
	getLog();
   

   
   
   
   
   
   
 }
 window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
   web3js = new Web3(web3.currentProvider);		                 // MetaMask
  } else {
           alert("You need to install the MetaMask browser extension"); 
  }
 startApp()
})