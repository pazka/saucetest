import { ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';


function serialize(obj: any) {
  var str = [];
  for (var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

//use fetch
const BASE_URL = "https://api.basescan.org/api/"

async function getApi<A>(url: string, queryParams?: { [key: string]: string }, config?: RequestInit): Promise<A> {
  const composedUrl = `${BASE_URL}${url}?${serialize(queryParams ?? {})}`;
  console.log(composedUrl);
  const response = await fetch(composedUrl, config);
  return response.json();
}



class BasescanService {
  async getBasescanData(walletAddress: string): Promise<ServiceResponse<any | null>> {
    const walletEthBalance = await getApi<BaseScanAccountBalanceResponse>(`/`, {
      module: 'account',
      action: 'balance',
      address: walletAddress,
      tag: 'latest',
      apikey: env.BASESCAN_API_KEY
    });

    if (!walletEthBalance) {
      return ServiceResponse.failure(walletEthBalance, null);
    }

    return ServiceResponse.success("Wallet balance in eth", walletEthBalance.result);
  }
}

export const basescanService = new BasescanService();