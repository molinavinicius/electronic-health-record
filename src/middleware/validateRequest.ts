import { Request, Response, NextFunction } from 'express';
import { ValidationError } from "class-validator";
import { transformAndValidate } from "class-transformer-validator";


function validationMiddleware<T>(type: any, skipMissing = false):
    (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
        transformAndValidate(type, req.body, { validator: { skipMissingProperties: skipMissing } })
            .then((payload) => {
                req.body = payload;
                next();
            })
            .catch((errors) => {
                const validationErrors = (errors as ValidationError[]).map(
                    ({ property, constraints }) => `${property}: ${Object.values(constraints || {}).join(", ")}`
                );
                res.status(400).json({ message: "Input validation failed", errors: validationErrors });
            });
    };
}

export default validationMiddleware