import React, { useEffect, useState, Component } from "react"; 
import Web3 from "web3";
import { contractAddressChallenge, contractAddressUSDT } from '../utils/consts';
import challengeABI from '../contracts/ChallengeABI.json';
import UsdtABI from '../contracts/USDTABI.json';
import { getAccount, getContract, txBuyToken, txSellToken, getWeb3 } from '../services/services';
import AccountData from './accountData';
import TransactionsList from './transactionsList';
import Transaction from './transaction';
const { ethereum } = window;

const Dapp = () => {
    const [account, setAccount] = useState(null);
    const [contractChallenge, setContractChallenge] = useState(null);
    const [contractUSDT, setContractUSDT] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function connectWallet(e) {
        e.preventDefault();
        console.log('connecting wallet ...');
        getAccount(ethereum, setAccount);
    }

    useEffect(() => {
        if(web3 !== null) {
            getContract(web3, setContractChallenge, challengeABI, contractAddressChallenge);
            getContract(web3, setContractUSDT, UsdtABI, contractAddressUSDT);
        }
    }, [web3])

    useEffect(() => {
        if(account !== null) {
            getWeb3(Web3, setWeb3);
        }
    }, [account])

    useEffect(() => {
        if(contractChallenge !== null && contractUSDT !== null) {
            setIsLoading(false);
        }
    },[contractChallenge, contractUSDT])

    if(!web3) {
        return (
        <div>
            <h1>Dapp Test</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>
        )
    }

    if(isLoading) {
        return (
            <div>
                <h1>Loading account ...</h1>
            </div>
        )
    }
    return (
    <div>
        <h1>Dapp Test</h1>
        <AccountData web3={web3} account={account} contractUSDT={contractUSDT}/>
        <Transaction contract={contractChallenge} web3={web3} account={account} txMethod={txBuyToken} transactions={transactions} setTransactions={setTransactions} purchaseCurrency='USDT'/>
        <Transaction contract={contractChallenge} web3={web3} account={account} txMethod={txSellToken} transactions={transactions} setTransactions={setTransactions} purchaseCurrency='ETH'/>
        <TransactionsList transactions={transactions} />
    </div>
    )
}

export default Dapp;
