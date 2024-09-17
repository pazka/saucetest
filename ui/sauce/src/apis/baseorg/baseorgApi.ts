import { getApi } from "./baseApi";

export const getWalletEthBalance = async (walletAddress : string) => {
    const response = await getApi<ServiceResponse<string>>("",{params: {walletAddress}});
    
    if(!response.data.success){
        throw new Error(response.data.message);
    }
    
    return parseInt(response.data.responseObject) / 1000000000000000000;
}
