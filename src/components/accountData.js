import React, { useState, useEffect } from "react";
import { getBalance, getTransactionCount, getTokenBalance } from '../services/services';


const AccountData = ({ web3, account, contractUSDT}) => {
    const [balance, setBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [nonce, setNonce] = useState(null);

    useEffect(() => {
        getBalance(web3, setBalance, account);
        getTransactionCount(web3, setNonce, account);
        getTokenBalance(contractUSDT, setTokenBalance, account );
    }, []);

    return (
        <>
            <p>Your account: {account}</p>
            <p>Your ETH balance: {balance}</p>
            <p>Your USDT balance: {tokenBalance}</p>
            <p>Your nonce: {nonce}</p>
        </>
    )
}

export default AccountData;
