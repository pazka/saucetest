import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";
import { alchemyController } from "./alchemyController";

export const alchemyRegistry = new OpenAPIRegistry();
export const alchemyRouter: Router = Router();

alchemyRouter.get("/wallet", alchemyController.getWalletData);

alchemyRegistry.registerPath({
    method: "get",
    path: "/alchemy/wallet",
    tags: ["Alchemy"],
    description: "wallet amount in wei",
    request: { query: z.object({ walletAddress: z.string() }) },
    responses: createApiResponse(z.any(), "Success")
});

alchemyRouter.get("/token", alchemyController.getTokenMetaData);

alchemyRegistry.registerPath({
    method: "get",
    path: "/alchemy/token",
    tags: ["Alchemy"],
    description: "token metadata",
    request: { query: z.object({ address: z.string() }) },
    responses: createApiResponse(z.any(), "Success")
});
