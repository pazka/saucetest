import { getApi } from "./baseApi";

export const getSwapQuotes = async (token: string, isBuy: boolean, inAmount: string) => {
    const response = await getApi<ServiceResponse<TokenMetadataResponse>>("getQuote", {
        params: {
            token,
            isBuy,
            inAmount
        }
    });
    
    if (!response.data.success) {
        throw new Error(response.data.message);
    }

    return response.data.responseObject;
}

