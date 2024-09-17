import type { Request, RequestHandler, Response } from "express";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { basescanService } from "./basescanService";

class BasescanController {
  public getBasescanData: RequestHandler = async (req: Request, res: Response) => {
    const walletAddress = req.query['walletAddress'] as string;
    if (!walletAddress) {
      return handleServiceResponse(ServiceResponse.failure('wallet not present',null), res);
    }
    
    return handleServiceResponse(await basescanService.getBasescanData(walletAddress), res);
  };
}

export const basescanController = new BasescanController();
