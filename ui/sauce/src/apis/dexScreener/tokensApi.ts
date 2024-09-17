import { getApi } from "./baseApi";

export const getTokenListings = async () => {
    const response = await getApi<DexScreener[]>("https://api.dexscreener.com/token-profiles/latest/v1");
    return response.data.filter(x => x.chainId === "ethereum");
}
