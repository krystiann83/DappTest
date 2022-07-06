# Running Dapp test app

### `npm i`
### `npm start`

Runs the app in the development mode.


# Issues, comments and further improvements

Main issue im curretly experiencing is not being able to receive token I bought. The transaction is passing correctly and but in etherscan i can see they go to some other account.
### https://goerli.etherscan.io/address/0x30dbe580610bcd65f5aa29f10f7d271c85344fdf#tokentxns

Because of that im not able to sell any tokens for ETH, but the transaction call is in the code.

I wanted to subscribe to the Swap event from the contract (code is in services.js) but its not working for me, im wondering if maybe it needs webhooks to function? To show the currect transactions I used in exchange the receipt object received from transaction call.
Transaction if is very basic but I guess I could use the transactionHash to get more information about this if needed.

In User story for lunching the app it was mentioned to show the swap app straight away if the account is connected, but following sugestions from MetaMask I put the button first and allow the user to connect after action. If metamask account is connected then we are being presented with app otherwise first we need to connect via metamask plugin.

I used hooks in the app but if we want to stay away from them then we could use class components and set up the state via constructor, or we could use some reactive programing libraries to allow for more vue like aproach. Plus we could utilize more of the event subscription of both web3 and contracts.

I tried to keep to code in small chunks to allow further expansion, also services are split into single purpose functions in case we would like to use them from other places.

Additional tweeks list:
- refresh account details section after transaction
- possibly use localStorage to keep track if user already connected to the account
- work more on the transation component to make it more reusable
- disable buttons during transactions flow and wallet connection
- of course work on the UI/UX of this app so it don't look like .NET application :)

While reviewing my code please keep in mind that I dont have much experience with web3 and etherum concepts so I might have missed some commonly known features :)

I hope to discuss this with you on the call, and I hope I will get some explenations to why im having those issue mentioned above :)

