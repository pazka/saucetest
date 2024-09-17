import { ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';
import serialize from '@/common/utils/serializerQuery';

const ZEROX_API_KEY = env['0X_API_KEY'];

const BASE_URL = 'https://base.api.0x.org';

class ZeroXService {
  async getSwapQuotes(buyToken: string, sellToken: string, sellAmount: string, takerAddress: string): Promise<ServiceResponse<Quote | null>> {

    const queryParams = serialize({
      buyToken, sellToken, sellAmount, takerAddress
    })
    const composedUrl = `${BASE_URL}/swap/v1/quote?${queryParams}`
    const options = {
      headers: {
        '0x-api-key': ZEROX_API_KEY
      }
    }


    console.log("QUOTE REQUEST :" + composedUrl);
    try {
      const response = await fetch(composedUrl, options);
      const data = await response.json();

      const quote: Quote = {
        expectedOutAmount: data.guaranteedPrice,
        quoteData: data
      }

      return ServiceResponse.success<any>("Requested "+composedUrl, quote);
    } catch (err: any) {
      return ServiceResponse.failure(err.message, null);
    }
  }
}

export const zeroXService = new ZeroXService();