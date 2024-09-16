
import * as jwt from 'jsonwebtoken';
import { env } from './envConfig';

export type JWTToken = string;

export async function createToken<T>(data : T): Promise<JWTToken > {
    return jwt.sign(data as object, env.TOKEN_SECRET, { expiresIn: 1800 });
}

export async function verifyToken(token: JWTToken): Promise<JWTToken | null> {
    return jwt.verify(token, env.TOKEN_SECRET) as JWTToken;
}

export async function decodeToken<T>(token: JWTToken): Promise<T | null> {
    return jwt.decode(token) as JWTToken as T;
}
