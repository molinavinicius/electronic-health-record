import UserService from '../services/users.service';
import validationMiddleware from '../middleware/validateRequest'
import express, { Request, Response } from 'express';
import { User } from '../models/user';


const UserRouter = express.Router();

UserRouter.get('/', async (req: Request, res: Response) => {
    let allUsers = await UserService.all()
    return res.status(allUsers.statusCode).json(allUsers)
});

UserRouter.get('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let user = await UserService.one(id)
    return res.status(user.statusCode).json(user)
});

UserRouter.post('/', validationMiddleware(User), async (req: Request, res: Response) => {
    let createdUser = await UserService.save(req.body)
    return res.status(createdUser.statusCode).json(createdUser)
});

UserRouter.put('/:id', validationMiddleware(User, true), async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let updatedUser = await UserService.update(id, req.body)
    return res.status(updatedUser.statusCode).json(updatedUser)
});

UserRouter.delete('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let deletedUser = await UserService.update(id, req.body)
    return res.status(deletedUser.statusCode).json(deletedUser)
});

export default UserRouter;