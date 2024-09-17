interface Quote{
    expectedOutAmount : BigInt;
    quoteData : Transaction;
}

interface Source {
    name: string;
    proportion: string;
}

interface FillData {
    tokenAddressPath: string[];
    router: string;
}

interface Order {
    makerToken: string;
    takerToken: string;
    makerAmount: string;
    takerAmount: string;
    fillData: FillData;
    source: string;
    sourcePathId: string;
    type: number;
}

interface Fees {
    zeroExFee: null | any; // Adjust the type if you have more information about the fee structure
}

interface Transaction {
    chainId: number;
    price: string;
    guaranteedPrice: string;
    estimatedPriceImpact: string;
    to: string;
    data: string;
    value: string;
    gas: string;
    estimatedGas: string;
    gasPrice: string;
    protocolFee: string;
    minimumProtocolFee: string;
    buyTokenAddress: string;
    sellTokenAddress: string;
    buyAmount: string;
    sellAmount: string;
    sources: Source[];
    orders: Order[];
    allowanceTarget: string;
    sellTokenToEthRate: string;
    buyTokenToEthRate: string;
    fees: Fees;
    grossPrice: string;
    grossBuyAmount: string;
    grossSellAmount: string;
}