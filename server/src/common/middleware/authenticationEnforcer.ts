import { SecureUser } from '@/api/user/userModel';
import { userService } from '@/api/user/userService';
import { createToken, decodeToken, verifyToken } from '@/common/utils/jwtToken';
import type { NextFunction, Request, Response } from "express";


const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const bearerString = req.headers.authorization;
    const token = bearerString?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!verifyToken(token)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = await decodeToken<SecureUser>(token).catch((err) => {
        console.error(err);
        return null;
    });

    if (!payload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const response = await userService.findById(payload.id)
    if (!response.success || !response.responseObject) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = response.responseObject;

    const newToken = await createToken(user);
    res.setHeader('Set-Authorization', newToken);

    req.user = response.responseObject;


    next();
};

export { isAuthenticated };

