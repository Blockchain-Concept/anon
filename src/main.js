 var web3js;
 var anonimizer;
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