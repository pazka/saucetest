import { ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';
import { Alchemy, Network, TokenBalancesResponse } from 'alchemy-sdk';

const settings = {
  apiKey: env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

class AlchemyService {
  async getAlchemyData(): Promise<ServiceResponse<TokenBalancesResponse | null>> {
    // get all NFTs owned by the provided address or ENS domain
    const nfts = alchemy.nft.getNftsForOwner("vitalik.eth");

    const vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    const usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

    // Print token balances of USDC in Vitalik's address
    const res = await alchemy.core.getTokenBalances(vitalikAddress, [usdcContract])
    return ServiceResponse.success<TokenBalancesResponse>("Alchemy data found", res);
  }
}

export const alchemyService = new AlchemyService();