import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";
import { basescanController } from "./basescanController";

export const basescanRegistry = new OpenAPIRegistry();
export const basescanRouter: Router = Router();

basescanRegistry.registerPath({
    method: "get",
    path: "/basescan",
    tags: ["Basescan"],
    description: "wallet amount in wei",
    request: { query: z.object({ walletAddress: z.string() }) },
    responses: createApiResponse(z.any(), "Success")
});

basescanRouter.get("/", basescanController.getBasescanData);
