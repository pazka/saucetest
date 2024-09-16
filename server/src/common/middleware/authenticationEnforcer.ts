import { SecureUser } from '@/api/user/userModel';
import { userService } from '@/api/user/userService';
import { decodeToken, verifyToken } from '@/common/utils/jwtToken';
import type { NextFunction, Request, Response } from "express";

type AuthenticatedRequest = Request & { user: SecureUser };

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const bearerString = req.headers.authorization;
    const token = bearerString?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!verifyToken(token)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload: SecureUser | null = await decodeToken<SecureUser>(token);
    if (!payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const response = await userService.findById(payload.id)
    
    if (!response.success) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    next();
};

export { isAuthenticated };

