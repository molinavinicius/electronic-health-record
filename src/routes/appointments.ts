import AppointmentsService from '../services/appointment.service';
import validationMiddleware from '../middleware/validateRequest'
import { isAuth } from '../middleware/isAuth';
import express, { Request, Response } from 'express';
import { Appointment } from '../models/appointment';


const AppointmentRouter = express.Router();

AppointmentRouter.get('/', isAuth, async (req: Request, res: Response) => {
    let allUsers = await AppointmentsService.all()
    return res.status(allUsers.statusCode).json(allUsers)
});

AppointmentRouter.get('/:id', isAuth, async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let user = await AppointmentsService.one(id)
    return res.status(user.statusCode).json(user)
});

AppointmentRouter.post('/', isAuth, validationMiddleware(Appointment, true), async (req: Request, res: Response) => {
    let availableAppointments = await AppointmentsService.createAppointment(req.body.patientId, req.body.doctorId, req.body.appointmentDate, req.body.duration)
    return res.status(200).json(availableAppointments)
});

AppointmentRouter.put('/:id', isAuth, validationMiddleware(Appointment, true), async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let updatedUser = await AppointmentsService.update(id, req.body)
    return res.status(updatedUser.statusCode).json(updatedUser)
});

AppointmentRouter.delete('/:id', isAuth, async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let deletedUser = await AppointmentsService.update(id, req.body)
    return res.status(deletedUser.statusCode).json(deletedUser)
});

export default AppointmentRouter;