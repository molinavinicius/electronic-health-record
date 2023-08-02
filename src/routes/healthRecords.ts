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

/**
 *  @swagger
 *  /health-records:
 *  post:
 *    tags:
 *    - "Health Record"
 *    summary: "Create health record"
 *    description: "Used to create a health record"
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              patient:
 *                type: "integer"
 *                format: "int64"
 *                description: "The patient ID"
 *                example: 1
 *              appointment:
 *                type: "integer"
 *                format: "int64"
 *                description: "The appointment ID"
 *                example: 1
 *              evolution:
 *                type: "string"
 *                description: "The health record evolution"
 *                example: "This is an example of a description that is at least 30 characters long."
 *    responses:
 *      '200':
 *        description: A successful response
 */
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
