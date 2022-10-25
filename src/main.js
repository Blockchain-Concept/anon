 var web3js;
 var anonimizer;
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
// *****************************окончание** //
// ********* функции статистики *********** //
// **************************************** //
 
 
 






 function startApp(){
   var anonimizerAddress = "0xeF7adBD3Fc5D1377c4A9C4005850e06c6A368BFB";
   anonimizer = new web3js.eth.Contract(anonABI, anonimizerAddress);
 }
 function getState() { 
    //document.getElementById('zombies').innerText =  await anonimizer.methods.state().call().toString();
	alert('000');
   //return anonimizer.methods.state.call()
anonimizer.methods.state().call().then((value) => {
	document.getElementById('zombies').innerText = value;
}, (errorReason) => {
});
	return false;
 }	
 function sendMessage() { 
anonimizer.methods.ownersMessages(1).call().then((value) => {
	document.getElementById('zombies2').innerText = value;
}, (errorReason) => {
	alert('333');
});
return false;
 }		  
 window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
   web3js = new Web3(web3.currentProvider);		                 // MetaMask
  } else {
           alert("You need to install the MetaMask browser extension"); 
  }
 startApp()
})