import { getApi } from "./baseApi";

export const getSwapQuotes = async (token: string, isBuy: boolean, inAmount: string) => {
    const response = await getApi<ServiceResponse<Quote>>("getQuote", {
        params: {
            token,
            isBuy,
            inAmount
        }
    });
    
    if (!response.data.success) {
        return null;
    }

    return response.data.responseObject;
}

