import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, SecureUserSchema, UserSchema } from "@/api/user/userModel";
import { isAuthenticated } from "@/common/middleware/authenticationEnforcer";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

const bearerAuth = userRegistry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
);

userRegistry.register("User", UserSchema);
userRegistry.register("SecureUser", SecureUserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(SecureUserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(SecureUserSchema, "Success"),
  security: [{ [bearerAuth.name]: [] }],
});

userRouter.get("/:id", validateRequest(GetUserSchema),isAuthenticated, userController.getUser);

userRouter.post("/login", userController.login);

userRegistry.registerPath({
  method: "post",
  path: "/users/login",
  tags: ["User"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  responses: createApiResponse(SecureUserSchema, "Success"),
});


userRouter.post("/", userController.createUser);

userRegistry.registerPath({
  method: "post",
  path: "/users",
  tags: ["User"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            age: {
              type: "number",
            },
          },
          required: ["name", "email", "password", "age"],
        },
      },
    },
  },
  responses: createApiResponse(SecureUserSchema, "Success"),
});
