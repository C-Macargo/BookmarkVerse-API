import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Schema } from 'joi';

export function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: errorMessage });
        }
        next();
    };
}
