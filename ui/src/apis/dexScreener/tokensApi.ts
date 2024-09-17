import { getApi } from "./baseApi";

export const getTokenListings = async () => {
    const response = await getApi<DexScreener[]>("token-profiles/latest/v1");
    console.log("DEX",response.data);
    return response.data.filter((token) => token.chainId === "ethereum");
}
