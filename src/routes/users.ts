import UserService from '../services/users.service';
import validationMiddleware from '../middleware/validateRequest';
import { isAuth } from '../middleware/isAuth';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { AuthenticatedRequest } from '../types/api';

const UserRouter = express.Router();

UserRouter.get('/', async (req: Request, res: Response) => {
    let allUsers = await UserService.all();
    return res.status(allUsers.statusCode).json(allUsers);
});

UserRouter.get(
    '/profile',
    isAuth,
    async (req: AuthenticatedRequest, res: Response) => {
        let userId = parseInt(req.userId || '');
        let user = await UserService.one(userId);
        return res.status(user.statusCode).json(user);
    }
);

UserRouter.put(
    '/profile',
    isAuth,
    validationMiddleware(User, true),
    async (req: AuthenticatedRequest, res: Response) => {
        let userId = parseInt(req.userId || '');
        let updatedUser = await UserService.update(userId, req.body);
        return res.status(updatedUser.statusCode).json(updatedUser);
    }
);

UserRouter.delete('/profile', async (req: AuthenticatedRequest, res: Response) => {
    let userId = parseInt(req.userId || '');
    let deletedUser = await UserService.remove(userId);
    return res.status(deletedUser.statusCode).json(deletedUser);
});

export default UserRouter;
