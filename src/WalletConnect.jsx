import React, { useState } from 'react'
import { ethers } from 'ethers';

const WalletConnect = () => {

    const {accountDisplay, setAccountDisplay} = useState(null);
    const {balanceDisplay, setBalanceDisplay} = useState(null);

    const connectWallet = () => {

        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
            })
        } else {
            alert("Install Metamask");
        }

        const accountChangedHandler = (newAccount) => {
            console.log(newAccount);
            document.getElementById('accountDisplay').innerHTML = ("Address: " + newAccount);
            getUserBalance(newAccount.toString());

        }

        const getUserBalance = (address) => {
            window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
            .then(balance => {
                console.log(ethers.utils.formatEther(balance));
                document.getElementById('accountBalance').innerHTML = ("Balance: " + ethers.utils.formatEther(balance) + "ETH");
            
            })
        }

        document.getElementById('changeText').innerHTML = ("Connected");
        

        window.ethereum.on('accountsChanged', accountChangedHandler);

    }

    const chainChangedHandler = () => {
        window.location.reload();
        alert("why did you change network?, you dey mikrimo")
    }
    window.ethereum.on('chainChanged', chainChangedHandler);
   



  return (
    <div>
       <div > 
            <h1>Check Your Balance <br />Metamask has been hacked</h1>
            <button id="changeText" type="button" class="btn btn-primary" onClick={connectWallet}>Connect Wallet</button>
            <h3 id='accountDisplay'>Address: {accountDisplay} </h3>   
            <h3 id='accountBalance'>Balance: {balanceDisplay}</h3> 
        </div>

    </div>
  )
}

export default WalletConnect