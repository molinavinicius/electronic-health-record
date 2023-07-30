import ReservationsService from '../services/reservations.service';
import validationMiddleware from '../middleware/validateRequest'
import express, { Request, Response } from 'express';
import { Reservation } from '../models/reservation';


const ReservationRouter = express.Router();

ReservationRouter.get('/', async (req: Request, res: Response) => {
    let allUsers = await ReservationsService.all()
    return res.status(allUsers.statusCode).json(allUsers)
});

ReservationRouter.get('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let user = await ReservationsService.one(id)
    return res.status(user.statusCode).json(user)
});

ReservationRouter.post('/', validationMiddleware(Reservation), async (req: Request, res: Response) => {
    let createdUser = await ReservationsService.save(req.body)
    return res.status(createdUser.statusCode).json(createdUser)
});

ReservationRouter.put('/:id', validationMiddleware(Reservation, true), async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let updatedUser = await ReservationsService.update(id, req.body)
    return res.status(updatedUser.statusCode).json(updatedUser)
});

ReservationRouter.delete('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let deletedUser = await ReservationsService.update(id, req.body)
    return res.status(deletedUser.statusCode).json(deletedUser)
});

export default ReservationRouter;