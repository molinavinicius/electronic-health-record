import express, { Request, Response } from 'express';
import PatientRouter from './patients';
import UserRouter from './users';
import ReservationRouter from './reservation';

const rootRouter = express.Router();

rootRouter.use('/patients', PatientRouter);
rootRouter.use('/users', UserRouter);
rootRouter.use('/reservations', ReservationRouter);

export default rootRouter;

// const Router = express.Router();

// export type Route = {
//     method: string;
//     path: string;
//     // @ts-ignore
//     controller: BaseController;
//     action: string;
// }

// const Routes: Route[] = [
//     ...PatientRoutes,
//     ...ReservationRoutes,
//     // ...UserRoutes
// ]

// // register express routes from defined application routes
// Routes.forEach(route => {
//     (Router as any)[route.method](route.path, (req: Request, res: Response, next: Function) => {
//         const result = (new (route.controller as any))[route.action](req, res, next)
//         if (result instanceof Promise) {
//             result.then(result => result !== null && result !== undefined ? res.send(result) : res.send(null))

//         } else if (result !== null && result !== undefined) {
//             res.json(result)
//         }
//     })
// })

// export default Router;