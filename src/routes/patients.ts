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
    let user = await PatientService.one(id);
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
    let deletedUser = await PatientService.update(id, req.body);
    return res.status(deletedUser.statusCode).json(deletedUser);
});

export default PatientRouter;

const patients = [
    {
        id: 1,
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'johndoe@example.com',
        birthDate: '1993-05-28',
        gender: 'male',
        height: 180,
        weight: 75
    },
    {
        id: 2,
        name: 'Jane Smith',
        phone: '(555) 987-6543',
        email: 'janesmith@example.com',
        birthDate: '1992-11-15',
        gender: 'female',
        height: 165,
        weight: 65
    },
    {
        id: 3,
        name: 'Robert Johnson',
        phone: '(555) 777-8888',
        email: 'robertjohnson@example.com',
        birthDate: '1988-01-10',
        gender: 'male',
        height: 170,
        weight: 80
    },
    {
        id: 4,
        name: 'Emily Davis',
        phone: '(555) 444-3333',
        email: 'emilydavis@example.com',
        birthDate: '1995-06-30',
        gender: 'female',
        height: 160,
        weight: 55
    },
    {
        id: 5,
        name: 'James Martin',
        phone: '(555) 222-1111',
        email: 'jamesmartin@example.com',
        birthDate: '1990-05-10',
        gender: 'male',
        height: 175,
        weight: 85
    }
];
