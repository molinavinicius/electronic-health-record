import AppointmentsService from '../services/appointment.service';
import validationMiddleware from '../middleware/validateRequest'
import express, { Request, Response } from 'express';
import { Appointment } from '../models/appointment';


const AppointmentRouter = express.Router();

AppointmentRouter.get('/', async (req: Request, res: Response) => {
    let allUsers = await AppointmentsService.all()
    return res.status(allUsers.statusCode).json(allUsers)
});

AppointmentRouter.get('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let user = await AppointmentsService.one(id)
    return res.status(user.statusCode).json(user)
});

AppointmentRouter.post('/', validationMiddleware(Appointment), async (req: Request, res: Response) => {
    let createdUser = await AppointmentsService.save(req.body)
    return res.status(createdUser.statusCode).json(createdUser)
});

AppointmentRouter.put('/:id', validationMiddleware(Appointment, true), async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let updatedUser = await AppointmentsService.update(id, req.body)
    return res.status(updatedUser.statusCode).json(updatedUser)
});

AppointmentRouter.delete('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let deletedUser = await AppointmentsService.update(id, req.body)
    return res.status(deletedUser.statusCode).json(deletedUser)
});

export default AppointmentRouter;