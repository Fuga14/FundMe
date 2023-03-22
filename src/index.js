// Reading from the blockchain
// 13:33:34

import { ethers } from './ethers-5.1.esm.min.js';
import { abi, contractAddress } from './constans.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const ethAmountInput = document.getElementById('ethAmount');
const balanceButton = document.getElementById('balanceButton');
const withdrawButton = document.getElementById('withdrawButton');

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdrawFunds;

async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    // open metamask windown for connection
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (e) {
      console.log(e.message);
    }
    console.log('Metamask connected successfuly');
    connectButton.textContent = 'Connected';
  } else {
    console.log('No metamask!');
    connectButton.textContent = 'Install MetaMask!';
  }
}

async function getBalance() {
  if (connectButton.textContent !== 'Connected') {
    console.log('First connect your wallet to do any operations!');
    return;
  }

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}

async function fund() {
  if (connectButton.textContent !== 'Connected') {
    console.log('First connect your wallet to do any operations!');
    return;
  }

  const ethAmount = ethAmountInput.value;
  if (typeof window.ethereum !== 'undefined') {
    // provider / connection to the blockchain
    // signer / wallet / someone with some gas
    // contract that we are interacting witn
    // ^ ABI & Address

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // interaction with contract
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
        // listen transaction to be mined
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log('Done!');
    } catch (e) {
      console.log(e);
    }
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  // listen for this transaction to finish
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, transactionReceipt => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}

async function withdrawFunds() {
  if (connectButton.textContent === 'Connect') {
    console.log('To withdraw funds you need to be connected to your wallet!');
    return;
  }

  if (typeof window.ethereum === 'undefined') {
    return;
  }

  console.log('Withdrawing...');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const transactionResponse = await contract.withdraw();
    await listenForTransactionMine(transactionResponse, provider);
  } catch (e) {
    console.log(e);
  }
}
