import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from '../utils/statusCode';
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
             res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Unauthorized: No token provided" });
             return
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET not defined in environment variables");
        }
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
         res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Unauthorized: Invalid token" });
         return
    }
}