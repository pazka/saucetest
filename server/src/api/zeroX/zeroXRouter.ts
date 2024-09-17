import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { isAuthenticated } from "@/common/middleware/authenticationEnforcer";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";
import { zeroXController } from "./zeroXController";

export const zeroXRegistry = new OpenAPIRegistry();
export const zeroXRouter: Router = Router();

const bearerAuth = zeroXRegistry.registerComponent(
    'securitySchemes',
    'bearerAuth',
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }
  );
  
zeroXRegistry.registerPath({
    method: "get",
    path: "/0x/getQuote",
    tags: ["0x"],
    description: "Get quote",
    security: [{ [bearerAuth.name]: [] }],
    request: { query: z.object({ token: z.string(), isBuy: z.boolean(), inAmount: z.string() }) },
    responses: createApiResponse(z.object({
        expectedOutAmount: z.bigint(),
        quoteData: z.any()
    }), "Success")
});

zeroXRouter.get("/getQuote",isAuthenticated, zeroXController.getQuote as any);