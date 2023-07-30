import AuthenticationService from '../services/authentication';
import validationMiddleware from '../middleware/validateRequest'
import express, { Request, Response } from 'express';
import { User } from '../models/user';

const AuthenticationRouter = express.Router();


AuthenticationRouter.post('/signup', validationMiddleware(User), async (req: Request, res: Response) => {
    let { name, email, password } = req.body
    let createdUser = await AuthenticationService.signup(name, email, password)

    let response = {
        status: createdUser.status,
        statusCode: createdUser.statusCode,
        message: createdUser.statusCode === 201 ? "User created succesfully!" : createdUser.message
    }
    return res.status(response.statusCode).json(response)
});

AuthenticationRouter.post('/login', validationMiddleware(User, true), async (req: Request, res: Response) => {
    let { email, password } = req.body
    // @ts-ignore
    let loggedUser = await AuthenticationService.login(email, password)

    return res.status(loggedUser.statusCode).json(loggedUser)
});

export default AuthenticationRouter;