 var web3js;
 var anonimizer;


 
 

// ***************************************************** //
// ********* вспомогательные внутренние функции ******** //
// ***************************************************** //
//1) вспомогательная функция отката на первоначальное положение с возвратом денег по массиву отправителей. Комисси на адреса получателей не возвращаются! - защита от саботажа
function resetAll() internal {
    address payable _recipient;
    for (uint i=arraySenders.length - 1; i >= 0 ; i--){
        _recipient = payable(arraySenders[i].memberAddr);
        _recipient.transfer(optionsActual.mixingQuantity);
        arraySenders.pop;
    }
    clearAllReceivers();
}
//2) обнуление массивов отправителей и получателей, состояния после успешного окончания процесса перемешивания (анонимайзинга)
function setInitialState() internal{
    for (uint i=arraySenders.length - 1; i >= 0 ; i--){
        arraySenders.pop;
    }
    for (uint i=arrayReceivers.length - 1; i >= 0 ; i--){
        arrayReceivers.pop;
    }
    state = states.sendETH;
    stateLastChangedTime = block.timestamp;
}
//3) вспомогательная функция отправки всех денег по новым адресам (получателям)
function moneySend() internal {
    address payable _reciver;
    bool _sendStatus;
    for (uint i=0; i<=arrayReceivers.length - 1; i++){ 
        _reciver = payable(arrayReceivers[i]);
        //_reciver.transfer(optionsActual.mixingQuantity);
        _sendStatus = _reciver.send(optionsActual.mixingQuantity); // защита от DoS со смартконтрактов
        if  (!_sendStatus) {lostTransfers[_reciver] += optionsActual.mixingQuantity;} // защита от DoS со смартконтрактов
    }
}
//4) стираем все кошельки для получения перемешанного (анонимизированного эфира) с возвратом комиссий, если на контракте есть деньги
function clearAllReceivers() internal {
    address payable _reciver;
    bool _sendStatus;
        for (uint i=arrayReceivers.length - 1; i >= 0 ; i--){ 
            if (address(this).balance > optionsActual.ownerRewardValue * 2 ) {
                _reciver = payable(arrayReceivers[i]);
                //_reciver.transfer(optionsActual.ownerRewardValue);
                _sendStatus =_reciver.send(optionsActual.ownerRewardValue);
                if  (!_sendStatus) {lostTransfers[_reciver] += optionsActual.ownerRewardValue;} // защита от DoS со смартконтрактов
            }
            arrayReceivers.pop; 
        }
}
//5) вспомогательная функция перевода актуализации текущих настроек на основе плановых
function optionsActualize() internal {
    if (state == states.sendETH && arraySenders.length == 0 && optionsPlanning.needToActualize == true){
        optionsActual = optionsPlanning;
        optionsActual.changedDate = block.timestamp;
        optionsPlanning.needToActualize = false;
        emit optionsChanged("the settings have been updated",block.timestamp);
    }
}

// *********************************************** //
// ********* основная функциональность *********** //
// *********************************************** //
//1) добавление нового участника и если это последний участник, то переход на новый этап (смена статуса, фиксация времени)
function iWantMixETH() payable public {
    bool isInSender;
    member memory member1;
    require (state == states.sendETH, "the state of the contract is not in 'sendETH'. You can't send ETH now");    // проверка статуса sendETH
    require (msg.value == optionsActual.mixingQuantity,"wrong amount of money to mix");    // проверка, что сумма соответствует настройке, иначе возврат
    for (uint i=arraySenders.length - 1; i >= 0 ; i--){
        if (msg.sender == arraySenders[i].memberAddr){isInSender = true;}
    }
    require (isInSender == false, "this address is already involved in the mixing procedure"); // проверка, что с этого адреса ещё не отправляли деньги, 
    member1.memberAddr = msg.sender;
    arraySenders.push(member1);     // создание записи 
    emit addItemToList("new sender added", arraySenders.length, block.timestamp, state); // отправка события addItemToList (member1.sentReceiveApprove = false по умолчанию)
    if (arraySenders.length == optionsActual.pullSize){// проверка, что не последний участник (по настройке), иначе смена статуса на sendRecipient и отправка события stateChanged
        state = states.sendRecipient;
        emit stateChanged(state, block.timestamp);
        stateLastChangedTime = block.timestamp;
    } 
}

//2) удаление самим участникам своего участия на первом этапе. И если участников не осталось, то вызов функции актуализации параметров changeActualOptions
function iWantRemove() public {
    address payable _recipient;
    bool _sendStatus;
    require (state == states.sendETH, "the state of the contract is not in 'sendETH'. You can't cancel participation now");    // проверка статуса sendETH
    require (arraySenders.length > 0, "there is no one to delete");    // проверка статуса sendETH
    // удаление из динамичесского массива участника, если он там был
    for (uint i=arraySenders.length - 1; i >= 0 ; i--){
        if (msg.sender == arraySenders[i].memberAddr){
            _recipient = payable(arraySenders[i].memberAddr);
            //_recipient.transfer(optionsActual.mixingQuantity);
            _sendStatus =_recipient.send(optionsActual.mixingQuantity);// защита от DoS со смартконтрактов
            if  (!_sendStatus) {lostTransfers[_recipient] += optionsActual.mixingQuantity;} // защита от DoS со смартконтрактов
            arraySenders[i] = arraySenders[arraySenders.length - 1];
            arraySenders.pop;
            emit remItemFromMembersList("the number of participants has decreased",  arraySenders.length, block.timestamp);// отправка события уменьшения 
        }
    }    
    optionsActualize();  // актуализация опций смартконтракта. Проверка на 0й размер массива отправителей реализована внутри optionsActualize()
}

//3) добавление нового кошелька для получения (предварительно проверить статус. Если это последний кошелёк для получения, 
//        то сменить статус на sendConfirm). Если это не последний адрес получателя, а время на отправку кошельков-получателей вышло, то вызов
//        функций 1) переход на начальное пустое состояние и 2) возврата изначальных денег 
function sendRecipient() payable public {
    require (state == states.sendRecipient, "the state of the contract is not in 'sendRecipient'. You can't send address to receive for now");    // проверка статуса sendRecipient
    require (msg.value == optionsActual.ownerRewardValue, "you must send the commission in exact accordance with the Actual.ownerRewardValue setting"); // проверка комиссии
    arrayReceivers.push(msg.sender);// добавление подтверждения
    // проверка, что это последнее подтверждение и: смена статуса если и генерация события смены статуса если это так
    if (arrayReceivers.length == optionsActual.pullSize){
        state = states.sendConfirm;
        emit stateChanged(state, block.timestamp);
        stateLastChangedTime = block.timestamp;
    }
}
//4) добавление пометки о том, что кошелёк для получения был добавлен. Если это последнее подтверждение, 
//        то отправка всем кошелькам получателям их денег - вызов функции 3). Если не последний, то проверка на истечение общего времени на подтверждения
//        и в случае истечения вызов функций 1) переход на начальное пустое состояние и 2) возврата изначальных денег 
function setConfirmMark() public {
    bool _isNoConfirmed;
    require (state == states.sendConfirm, "the state of the contract is not in 'sendConfirm'. You can't send Confirm about receive wallet for now");// проверка статуса sendConfirm
    for (uint i=arraySenders.length - 1; i >= 0 ; i--){ // проверка, что отправитель есть в массиве отправителей и добавление отметки об отправке подтверждения
        if (msg.sender == arraySenders[i].memberAddr && arraySenders[i].sentReceiveApprove == false){
            arraySenders[i].sentReceiveApprove = true;
        }
        if (arraySenders[i].sentReceiveApprove == false){ 
            _isNoConfirmed = true; //делаем true, если есть хоть один адрес без подтверждения кошелька для получения
        }
    }        
    if (_isNoConfirmed == false){// если не было ни одной записи в массиве отправителей с sentReceiveApprove == false (т.е. были отправлены все подтверждения)
        state = states.mayGetMoney; // то смена статуса на следующий и генерация события смены статуса
        stateLastChangedTime = block.timestamp;
        emit stateChanged(state, block.timestamp);
        moneySend();
        setInitialState();
        optionsActualize();
    }
}



//5) проверка любым желающим продолжительности актуального состояния отправки подтверждений или отправки адреса получения, 
function checkState(){
	var _result;
	anonimizer.methods.stateCheck().send().then(_result = true, (errorReason) => {});
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