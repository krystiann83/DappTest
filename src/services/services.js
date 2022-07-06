export async function getContract(web3, callback, contractABI, contractAddress) {
    const contract = await new web3.eth.Contract(contractABI, contractAddress);
    callback(contract);
    // swapEventObserver(contract);
}

export async function getAccount(ethereum, callback) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    callback(accounts[0]);
}

export async function getWeb3(Web3, callback) {
    const web3 = new Web3(Web3.givenProvider);
    callback(web3);
}

export async function getBalance(web3, callback, account) {
    await web3.eth.getBalance(account, (err, wei) => {
        callback(web3.utils.fromWei(wei, 'ether'));
})}

export async function getTokenBalance(contract, callback, account) {
        await contract.methods.balanceOf(account).call({}, (err, value) => {
            console.log('tokens for account', value);
            callback(value);
        })
}

export async function getTransactionCount(web3, callback, account) {
    await web3.eth.getTransactionCount(account, (err, nonce) => {
        callback(nonce);
})}

export async function getTokenPrice(contract, callback) {
    await contract.methods.tokenPrice().call((err, tokenPrice) => {
        callback(tokenPrice);
    });
}

export function swapEventObserver(contract) {
    console.log('in the swap event observer ...', contract.events.Swap);
    contract.events.Swap({
        filter: {
            value: [],
        },
        fromBlock: 0
    }, (err, event) => { console.log(event); })
    .on("connected", function(subscriptionId){
        console.log(subscriptionId);
    })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
        // remove event from local database
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log('error', error);
    });
}

export async function txBuyToken(transactionValue, web3, contract, account, transactions, callback) {
    await contract.methods.buy().send({value: web3.utils.toWei(transactionValue, 'ether'), from: account})
    .on('transactionHash', function(hash){
        console.log('transactionHash', hash);
    })
    .on('receipt', function(receipt){
        callback([...transactions, receipt]);
        console.log('receipt', receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log('confirmation', confirmationNumber, receipt);
    })
    .on('error', function(error, receipt) {
        callback([...transactions, receipt])
        console.log('error', error, receipt);
    });
}

export async function txSellToken(transactionValue, web3, contract, account, transactions, callback) {
        await contract.methods.sell(transactionValue).send({from: account})
        .on('transactionHash', function(hash){
            console.log('transactionHash', hash);
        })
        .on('receipt', function(receipt){
            callback([...transactions, receipt]);
            console.log('receipt', receipt);
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log('confirmation', confirmationNumber, receipt);
        })
        .on('error', function(error, receipt) {
            callback([...transactions, receipt])
            console.log('error', error, receipt);
        });
}