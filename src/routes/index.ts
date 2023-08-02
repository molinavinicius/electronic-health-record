import express from 'express';
import PatientRouter from './patients';
import UserRouter from './users';
import AppointmentRouter from './appointments';
import HealthRecordRouter from './healthRecords';
import AuthenticationRouter from './authentication';

const rootRouter = express.Router();

rootRouter.use('/patients', PatientRouter);
rootRouter.use('/users', UserRouter);
rootRouter.use('/appointments', AppointmentRouter);
rootRouter.use('/health-records', HealthRecordRouter);
rootRouter.use('/auth', AuthenticationRouter);

export default rootRouter;
