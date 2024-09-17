import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { alchemyService } from "./alchemyService";

class AlchemyController {  
  public getWalletData: RequestHandler = async (req: Request, res: Response) => {
    
    const walletAddress = req.query.walletAddress as string;
    return handleServiceResponse(await alchemyService.getWalletData(walletAddress), res);
  };
  
  public getTokenMetaData: RequestHandler = async (req: Request, res: Response) => {
      const address = req.query.address as string;
      return handleServiceResponse(await alchemyService.getTokenMetaData(address), res);
    };
}

export const alchemyController = new AlchemyController();
