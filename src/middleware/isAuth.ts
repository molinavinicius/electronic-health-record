import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../database';
import { User } from '../models/user';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(403).json({
            status: 'error',
            statusCode: 403,
            message: 'Not authenticated'
        });
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT Secret is not defined.');
    }

    try {
        decodedToken = jwt.verify(token, secret);
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            console.log(err);
            return res.status(403).json({
                statusCode: 403,
                status: 'error',
                message: 'Token expired'
            });
        } else if (err instanceof jwt.JsonWebTokenError) {
            console.log(err);
            return res.status(403).json({
                statusCode: 403,
                status: 'error',
                message: 'Invalid token'
            });
        }
        console.log(err);
        return res.status(500).json({
            statusCode: 500,
            status: 'error',
            message: 'Internal server error'
        });
    }
    if (!decodedToken) {
        return res.status(403).json({
            status: 'error',
            statusCode: 403,
            message: 'Not authenticated'
        });
    }
    // @ts-ignore
    req.userId = decodedToken.userId;
    next();
};
