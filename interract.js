// import { generateShieldedAddress, makeShieldedTransfer } from "./zkAPICalls.js"

// import * as dotenv from "dotenv";
// import { ethers } from "ethers";

// dotenv.config();

// const generateShieldedAddress = require("./zkAPI.calls.js")
// const makeShieldedTransfer = require("./zkAPI.calls.js")

let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function connectMetamask() {
  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  signer = await provider.getSigner();

  console.log("Account address s:", await signer.getAddress());
}

async function makeShieldedTransfer(reciever = '', amt = 0) {

  const str = '{"accountId":"091fd51f-79ea-48a5-98f9-f00205279e84","amount":' + amt.toString() + ',"to":"' + (reciever).toString() + '"}';

  console.log(str);

  // const jsn = JSON.parse(str);
  // console.log(jsn)
  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      // body: '{"accountId":"091fd51f-79ea-48a5-98f9-f00205279e84","amount":500000000,"to":"PZeCN3bzt5f5mpY4bBvDqnGaQ1bD2qMgNEVVYCsobvfz3Noonsirdf7xE33UtHH"}'
      body: str
    };
    
    await fetch('https://cloud-mvp.zkbob.com/transfer', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
}


async function generateShieldedAddress(url = ' ') {
  const response = await fetch(url, {
    method: 'GET',
    body: JSON.stringify()
  })
  return response.json();
}



const contractAddress = "0x4940B581F3bc26011Dfb88Ed6734A2a9463355bF";

const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "disliker",
				"type": "string"
			}
		],
		"name": "addDisliker",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "liker",
				"type": "string"
			}
		],
		"name": "addLiker",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "articleAuthors",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "authorBalances",
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dislikes",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "getAuthorBalancesByArticleId",
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
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "getAuthorsByArticleId",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "getDisLikersByArticleId",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "getLikersByArticleId",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "getRewardByArticleId",
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
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "getWinnerssByArticleId",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
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
		"name": "isFake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
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
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "isThisArticleFake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "likes",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "journalist",
				"type": "string"
			}
		],
		"name": "post",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "articleId",
				"type": "uint256"
			}
		],
		"name": "trigger",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winners",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];



async function likeOnClick() {
    
    const data = await generateShieldedAddress('https://cloud-mvp.zkbob.com/generateAddress?id=091fd51f-79ea-48a5-98f9-f00205279e84');
    console.log(data);
    return data;
}

async function dislikeOnClick() {
    
  const data = await generateShieldedAddress('https://cloud-mvp.zkbob.com/generateAddress?id=091fd51f-79ea-48a5-98f9-f00205279e84');
  console.log(data);
  return data;
}



async function verifyTxn(TxHash = '') {

    const str = 'https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash='+TxHash+'&apikey=DQNYTAJ16I7R8SQGSH7WP5H2VF9K13T9HJ';

    const url = str;
	const response = await fetch(url, {
	  method: "GET",
	  body: JSON.stringify(),
	});
	return response.json();


  }


  async function verifycaller(TxHash= '0xbb219c2a43d4cca7b5b5019afbc9284b6bb7cd4418376fc21b2f353474b0b0c7', uid= 'J46TDY5BZrZFzqJGVnFdXHKkU5daTq9kfHUic7mqe3ivFrfKnww1WL9fBpUtxWh', articleId = 1, isLike = 1) {

   verifyTxn(
        TxHash
  ).then((data) => {
	if(data.result.status=='1'){
        
        if(isLike)
            addLike(articleId, uid)
        else
            addDislike(articleId, uid)

        console.log("successful");
    }
    else{
      console.log("failed");
    };
  });

}

const decimals = 1e9;
console.log(decimals)

var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function claimReward(articleId=1) {

  const stacking = new ethers.Contract(contractAddress, contractAbi, provider);

  const txResponse = await stacking
    .connect(signer)
    .trigger(articleId); // replace signer with uid
  await txResponse.wait();
  console.log((txResponse)); 

  const winners = await stacking.getWinnerssByArticleId(articleId);
  console.log(winners.toString());

  const reward = await stacking.getRewardByArticleId(articleId);
  console.log(reward);

  const author = await stacking.getAuthorsByArticleId(articleId);
  console.log(author.toString());

  const authorPayment = await stacking.getAuthorBalancesByArticleId(articleId);
  console.log(authorPayment.toString());
  
  const n = winners.length;
  console.log(n);

  for(let i = 0; i < n; i++) {
    //  console.log(decimals+parseInt(reward))
    // await makeShieldedTransfer(winners[i], decimals+parseInt(reward));
    // await sleep(75000);
    console.log(winners[i]);
  }

  // await makeShieldedTransfer(author, parseInt(authorPayment));    

}



// claimReward(0);

async function addLike(articleId = 2, uid = "J46TDY5BZrZFzqJGVnFdXHKkU5daTq9kfHUic7mqe3ivFrfKnww1WL9fBpUtxWh", add = "0x0") {
  const stacking = new ethers.Contract(contractAddress, contractAbi, provider);

  const txResponse = await stacking
    .connect(signer)
    .addLiker(articleId, uid, add); // replace signer with uid
  await txResponse.wait();
}




async function addDislike(articleId = 1, uid = "",  add = "0x0") {
  const stacking = new ethers.Contract(contractAddress, contractAbi, provider);

  const txResponse = await stacking
    .connect(signer)
    .addDisliker(articleId, uid,add); // replace signer with uid
  await txResponse.wait();
}

async function post(articleId = 1, uid = "UaSybCKMeAA7R5MHSTLdwvdQq6zizwYwA4Gm6mPwWFmViRb5okFipbXgWvhQVDE") {
  const stacking = new ethers.Contract(contractAddress, contractAbi, provider);

  const txResponse = await stacking
    .connect(signer)
    .post(articleId, uid); // replace signer with uid
  await txResponse.wait();
}


