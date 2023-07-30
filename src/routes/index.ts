import express from 'express';
import PatientRouter from './patients';
import UserRouter from './users';
import ReservationRouter from './reservation';
import HealthRecordRouter from './healthRecord';

const rootRouter = express.Router();

rootRouter.use('/patients', PatientRouter);
rootRouter.use('/users', UserRouter);
rootRouter.use('/reservations', ReservationRouter);
rootRouter.use('/health-records', HealthRecordRouter);

export default rootRouter;