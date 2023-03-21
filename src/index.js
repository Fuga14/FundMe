import { ethers } from './ethers-5.1.esm.min.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');

connectButton.onclick = connect;
fundButton.onclick = fund;

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
    connectButton.textContent = 'Install MetaMask first!';
  }
}

async function fund() {
  if (typeof window.ethereum !== 'undefined') {
    // provider / connection to the blockchain
    // signer / wallet / someone with some gas
    // contract that we are interacting witn
    // ^ ABI & Address
  }
}

// 13:07:58
