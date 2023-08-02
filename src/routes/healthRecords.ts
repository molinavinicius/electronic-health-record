import HealthRecordService from '../services/healthRecord.service';
import validationMiddleware from '../middleware/validateRequest';
import { isAuth } from '../middleware/isAuth';
import express, { Request, Response } from 'express';
import { HealthRecord } from '../models/healthRecord';

const HealthRecordRouter = express.Router();

HealthRecordRouter.get('/', isAuth, async (req: Request, res: Response) => {
    let allUsers = await HealthRecordService.all();
    return res.status(allUsers.statusCode).json(allUsers);
});

HealthRecordRouter.get('/:id', isAuth, async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let user = await HealthRecordService.one(id, { relations: ['patient', 'healthProfessional'] });
    return res.status(user.statusCode).json(user);
});

HealthRecordRouter.post(
    '/',
    isAuth,
    validationMiddleware(HealthRecord),
    async (req: any, res: Response) => {
        req.body.healthProfessional = req.userId;
        req.body.patientId = req.body.patient;
        console.log('req.body', req.body);
        let createdUser = await HealthRecordService.save(req.body);
        return res.status(createdUser.statusCode).json(createdUser);
    }
);

export default HealthRecordRouter;
