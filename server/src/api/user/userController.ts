import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { createToken } from "@/common/utils/jwtToken";
import { SecureUser } from "./userModel";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await userService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
  
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await userService.createNewUser(req.body);
    return handleServiceResponse(serviceResponse, res);
  };
  
  public login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const serviceResponse = await userService.login(email, password);
    
    if (serviceResponse.success) {
      const token = await createToken<SecureUser>(serviceResponse.responseObject as SecureUser);
      res.setHeader("Set-Authorization", token);
    }
    
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
