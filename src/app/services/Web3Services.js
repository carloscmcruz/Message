import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRAC_ADDRESS ="0x1eB4A63802202C1367b3bf71acbc2334a5533c69";

export async function doLogin() {
    if(!window.ethereum) throw new Error("No MetaMask found");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Wallet not found or allowed");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract(){
    if(!window.ethereum) throw new Error("No MetaMask found");
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");

    return new web3.eth.Contract(ABI, CONTRAC_ADDRESS, { from });

}

export async function addTweet(text){
    const contract = getContract();
    return contract.methods.addTweet(text).send();
}

export async function changeUsername(newName){
    const contract = getContract();
    return contract.methods.changeUsername(newName).send();
}

export async function getLastTweets(page){
    const contract = getContract ();
    const tweets = await contract.methods.getLastTweets(page).call();
    return tweets.map(t => {return{...t}}).filter(t=> t.text !== "");
}