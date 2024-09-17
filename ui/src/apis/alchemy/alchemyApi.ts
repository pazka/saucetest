import { getApi } from "./baseApi";

export const getTokenMetaData = async (address: string) => {
    const response = await getApi<ServiceResponse<TokenMetadataResponse>>("token", { params: { address } });
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    
    return response.data.responseObject;
}