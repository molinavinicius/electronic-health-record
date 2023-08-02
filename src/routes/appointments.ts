import AppointmentsService from '../services/appointment.service';
import validationMiddleware from '../middleware/validateRequest';
import { isAuth } from '../middleware/isAuth';
import express, { Request, Response } from 'express';
import { Appointment } from '../models/appointment';

const AppointmentRouter = express.Router();

AppointmentRouter.get('/', isAuth, async (req: Request, res: Response) => {
    let allUsers = await AppointmentsService.all();
    return res.status(allUsers.statusCode).json(allUsers);
});

AppointmentRouter.get('/:id', isAuth, async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let user = await AppointmentsService.one(id);
    return res.status(user.statusCode).json(user);
});

AppointmentRouter.post(
    '/',
    isAuth,
    validationMiddleware(Appointment),
    async (req: Request, res: Response) => {
        console.log(req.body);
        let attemptiveToSchedule = await AppointmentsService.validateAppointment(
            req.body,
            Object.keys(req.body)
        );
        if (attemptiveToSchedule.status === 'error') {
            return res
                .status(attemptiveToSchedule.statusCode)
                .json(attemptiveToSchedule);
        }
        let scheduledAppointment = await AppointmentsService.save(attemptiveToSchedule.data)
        return res.status(scheduledAppointment.statusCode).json(scheduledAppointment);
    }
);

AppointmentRouter.put(
    '/:id',
    isAuth,
    validationMiddleware(Appointment, true),
    async (req: Request, res: Response) => {
        let id = parseInt(req.params.id);
        let existingAppointment = await AppointmentsService.one(id, { relations: ['patient', 'healthProfessional'] });
        if (!existingAppointment.data) {
            return res.status(404).json({
                ...existingAppointment,
                message: 'Appointment not found'
            })
        }

        let appointmentToUpdate = {
            ...existingAppointment.data,
            patient: existingAppointment.data.patient.id,
            healthProfessional: existingAppointment.data.healthProfessional.id,
            ...req.body
        }

        console.log('appointmentToUpdate', appointmentToUpdate)
        let attemptiveToUpdate = await AppointmentsService.validateAppointment(appointmentToUpdate, Object.keys(req.body))
        if (attemptiveToUpdate.status === 'error') {
            return res
                .status(attemptiveToUpdate.statusCode)
                .json(attemptiveToUpdate);
        }

        let updatedAppointment = await AppointmentsService.update(id, attemptiveToUpdate.data);
        return res.status(updatedAppointment.statusCode).json(updatedAppointment);
    }
);

AppointmentRouter.delete(
    '/:id',
    isAuth,
    async (req: Request, res: Response) => {
        let id = parseInt(req.params.id);
        let deletedUser = await AppointmentsService.update(id, req.body);
        return res.status(deletedUser.statusCode).json(deletedUser);
    }
);

export default AppointmentRouter;
