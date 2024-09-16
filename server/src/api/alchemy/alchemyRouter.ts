import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";
import { alchemyController } from "./alchemyController";

export const alchemyRegistry = new OpenAPIRegistry();
export const alchemyRouter: Router = Router();

alchemyRegistry.registerPath({
    method: "get",
    path: "/alchemy",
    tags: ["Alchemy"],
    responses: createApiResponse(z.any(), "Success"),
});

alchemyRouter.get("/", alchemyController.getAlchemyData);
