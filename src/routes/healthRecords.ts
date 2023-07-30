import HealthRecordService from '../services/healthRecord.service';
import validationMiddleware from '../middleware/validateRequest'
import express, { Request, Response } from 'express';
import { HealthRecord } from '../models/healthRecord';


const HealthRecordRouter = express.Router();

HealthRecordRouter.get('/', async (req: Request, res: Response) => {
    let allUsers = await HealthRecordService.all()
    return res.status(allUsers.statusCode).json(allUsers)
});

HealthRecordRouter.get('/:id', async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    let user = await HealthRecordService.one(id)
    return res.status(user.statusCode).json(user)
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
HealthRecordRouter.post('/', validationMiddleware(HealthRecord), async (req: Request, res: Response) => {
    let createdUser = await HealthRecordService.save(req.body)
    return res.status(createdUser.statusCode).json(createdUser)
});

// HealthRecordRouter.put('/:id', validationMiddleware(HealthRecord, true), async (req: Request, res: Response) => {
//     let id = parseInt(req.params.id)
//     let updatedUser = await HealthRecordService.update(id, req.body)
//     return res.status(updatedUser.statusCode).json(updatedUser)
// });

// HealthRecordRouter.delete('/:id', async (req: Request, res: Response) => {
//     let id = parseInt(req.params.id)
//     let deletedUser = await HealthRecordService.update(id, req.body)
//     return res.status(deletedUser.statusCode).json(deletedUser)
// });

export default HealthRecordRouter;