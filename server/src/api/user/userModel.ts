import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export type SecureUser = z.infer<typeof SecureUserSchema>;
export type NewUserDTO = z.infer<typeof CreateUserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  privateKey: z.string(),
  walletAddress: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const SecureUserSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
  walletAddress: true,
  createdAt: true,
  updatedAt: true,
});


// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});


export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true })