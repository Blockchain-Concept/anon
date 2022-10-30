var anonABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "sendersAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum Anonimizer.states",
				"name": "_state",
				"type": "uint8"
			}
		],
		"name": "addItemToList",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "moneyRollback",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "moneySentSuccessfully",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "optionsChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "sendersAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "remItemFromMembersList",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum Anonimizer.states",
				"name": "_state",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "stateChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "iWantMixETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "iWantRemove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lostAddress",
				"type": "address"
			}
		],
		"name": "lostTransfersSendByAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_result",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "messageAdd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendRecipient",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setConfirmMark",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_stateWaitIntervalTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_mixingQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ownerRewardValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_stateCheckCommision",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_pullSize",
				"type": "uint8"
			}
		],
		"name": "setOptionsValues",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stateCheck",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_stash",
				"type": "uint256"
			}
		],
		"name": "withdrawReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "allRollback",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allSuccess",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arrayReceivers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arraySenders",
		"outputs": [
			{
				"internalType": "address",
				"name": "memberAddr",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "sentReceiveApprove",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "birthdayService",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalanse",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_allBalanse",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_freeBalanse",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lostTransfersCheck",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lostAddress",
				"type": "address"
			}
		],
		"name": "lostTransfersCheckByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "optionsActual",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stateWaitIntervalTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mixingQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ownerRewardValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stateCheckCommision",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "pullSize",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "changedDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "needToActualize",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "optionsPlanning",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stateWaitIntervalTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mixingQuantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ownerRewardValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stateCheckCommision",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "pullSize",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "changedDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "needToActualize",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ownersMessages",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "statConfirms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "enum Anonimizer.states",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stateLastChangedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "statReceivers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "statSenders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]