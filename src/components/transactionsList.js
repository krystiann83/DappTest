import React from "react";

const TransactionsList = ({ transactions }) => {
    return (
        <>
            <h1>Your current transactions</h1>
            {transactions.map((transaction, index) => {
                console.log('transaction', transaction);
                const { from, to, status } = transaction;
                return <p key={index} >{index}. from: {from} to: {to} status: {status.toString()}</p>
            })}
        </>
    )
}

export default TransactionsList;
