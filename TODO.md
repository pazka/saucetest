# Sauce test

## Design choice

All data on user side,
Server is for backend operations

## Plan

- Simple React
- Express
- User

- Link with basic empty apis
- Link to providers, Base, Alchemy, DexScreener

- start to enrich apis

## TODO

- Filter dex on eth

- 0x : get a swap quote (buy token , sell token)
- get the parameters for the transaction

- alchemy -> Send it as a transaction with the provided parameters
- 0x : Check status of transaction (receipt) or failure
-

Priority :

- Swap
- Profit / loss (calculate profit/loss in eth, usd later)
- Display
- Profit / loss ( usd later)

## Done

- Front/back communicaiton
- User management
- Wallet creation (coinbase)
- connected wallet to Base.org
- Obtained Alchemy API key
- Obtained 0x API key
- Used DexScreener API to list latest token ( whatever that means )
- Obtained BaseScan api key to check wallet balance