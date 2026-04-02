import {Request , Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/customRequest';

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {

    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        req.user = { id: decoded.id };
        next();
        
    } catch (err) {
        return res.status(401).json({message : "invalid token Unauthorized"});
    }
}
