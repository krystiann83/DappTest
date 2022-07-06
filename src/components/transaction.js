import React, { useState, useEffect } from "react";
import { getTokenPrice } from '../services/services';


const Transaction = ({ contract, txMethod, web3, account, transactions, setTransactions, purchaseCurrency }) => {
    const [transactionValue, setTransactionValue] = useState(0);
    const [tokenPrice, setTokenPrice] = useState(100);

    useEffect(() => {
        getTokenPrice(contract, setTokenPrice);
    }, [])

    function txOutcomeValue() {
        const value = transactionValue*tokenPrice;
        return purchaseCurrency === 'USDT' ? value : value/(tokenPrice*tokenPrice);
    }

    return (
        <>
            <form>
                <label>transaction value:<input type="number" onChange={(e) => {setTransactionValue(e.target.value)}} /></label>
                <p>You will receive {txOutcomeValue()} {purchaseCurrency}</p>
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    txMethod(transactionValue, web3, contract, account, transactions, setTransactions);
                    console.log('e', e);
                }}>Buy {purchaseCurrency}</button>
            </form>
        </>
    )
}

export default Transaction;
