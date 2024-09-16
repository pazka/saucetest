import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { alchemyService } from "./alchemyService";

class AlchemyController {
  public getAlchemyData: RequestHandler = async (_req: Request, res: Response) => {
    return handleServiceResponse(await alchemyService.getAlchemyData(), res);
  };
}

export const alchemyController = new AlchemyController();
