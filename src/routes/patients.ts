import PatientService from '../services/patients.service';
import validationMiddleware from '../middleware/validateRequest';
import { isAuth } from '../middleware/isAuth';
import express, { Request, Response } from 'express';
import { Patient } from '../models/patient';

const PatientRouter = express.Router();

PatientRouter.get('/', isAuth, async (req: Request, res: Response) => {
    let allUsers = await PatientService.all();
    return res.status(allUsers.statusCode).json(allUsers);
});

PatientRouter.get('/:id', isAuth, async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let user = await PatientService.one(id, { relations: ['healthRecords', 'appointments'] });
    return res.status(user.statusCode).json(user);
});

PatientRouter.post(
    '/',
    isAuth,
    validationMiddleware(Patient),
    async (req: Request, res: Response) => {
        let createdUser = await PatientService.save(req.body);
        return res.status(createdUser.statusCode).json(createdUser);
    }
);

PatientRouter.put(
    '/:id',
    isAuth,
    validationMiddleware(Patient, true),
    async (req: Request, res: Response) => {
        let id = parseInt(req.params.id);
        let updatedUser = await PatientService.update(id, req.body);
        return res.status(updatedUser.statusCode).json(updatedUser);
    }
);

PatientRouter.delete('/:id', isAuth, async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let deletedUser = await PatientService.remove(id);
    return res.status(deletedUser.statusCode).json(deletedUser);
});

export default PatientRouter;