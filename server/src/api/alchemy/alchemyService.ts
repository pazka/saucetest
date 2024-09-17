import { ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';
import { Alchemy, Network, TokenBalancesResponse, TokenMetadataResponse } from 'alchemy-sdk';

const alchemyBase = new Alchemy({
  apiKey: env.ALCHEMY_API_KEY,
  network: Network.BASE_MAINNET,
});

const alchemyEth = new Alchemy({
  apiKey: env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

class AlchemyService {
  async getWalletData(walletAddress: string): Promise<ServiceResponse<TokenBalancesResponse | null>> {

    //let res = await alchemy.core.getTokensForOwner(walletAddress);
    try {
      let res = await alchemyBase.core.getBalance(walletAddress);
      return ServiceResponse.success<any>("Alchemy data found", res);
    } catch (e : any) {
      return ServiceResponse.failure("Alchemy failed", JSON.parse(e.body));
    }
  }

  async getTokenMetaData(address: string): Promise<ServiceResponse<TokenMetadataResponse | null>> {
    try {
      let res = await alchemyEth.core.getTokenMetadata(address);
      return ServiceResponse.success<any>("Alchemy data found", res);
    } catch (e : any) {
      return ServiceResponse.failure("Alchemy failed", JSON.parse(e.body));
    }

  }
}

export const alchemyService = new AlchemyService();