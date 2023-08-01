import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../database';
import { User } from '../models/user';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(403).json({ message: "Not authenticated" })
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        // @ts-ignore
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw err;
    }
    if (!decodedToken) {
        return res.status(403).json({ message: "Not authenticated" })
    }
    // @ts-ignore
    req.userId = decodedToken.userId;
    next();
};