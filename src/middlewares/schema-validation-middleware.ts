import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { Schema } from "joi";

export function validateSchema(schema: Schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			const errorMessages = error.details.map((detail) => detail.message);
			return res
				.status(httpStatus.BAD_REQUEST)
				.json({ errors: errorMessages });
		}
		next();
	};
}
