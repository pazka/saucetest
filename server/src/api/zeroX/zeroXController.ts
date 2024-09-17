import type { Request, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { SecureUser } from "../user/userModel";
import { zeroXService } from "./zeroXService";

class ZeroXController {
  public getQuote = async (req: Request & { user: SecureUser }, res: Response) => {

    const token = req.query.token as string;

    const sellAmount = req.query.inAmount as string;
    let buyToken = ""
    let sellToken = ""
    if (req.query.isBuy as string == "true") {
      buyToken = token
      sellToken = "ETH"
    } else {
      buyToken = "ETH"
      sellToken = token
    }

    const takerAddress = req.user.walletAddress;

    return handleServiceResponse(await zeroXService.getSwapQuotes(buyToken, sellToken, sellAmount, takerAddress), res);
  };
}

export const zeroXController = new ZeroXController();
