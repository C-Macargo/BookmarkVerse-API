import httpStatus from "http-status";
import { Request, Response } from "express";
import { ApplicationError } from "../utils/protocols";

export function errorHandler(
	err: ApplicationError | Error,
	_req: Request,
	res: Response
) {
	if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
		return res.status(httpStatus.CONFLICT).send({
			message: err.message,
		});
	}

	if (err.name === "InvalidCredentialsError") {
		return res.status(httpStatus.UNAUTHORIZED).send({
			message: err.message,
		});
	}

	if (err.name === "InvalidSearchError") {
		return res.status(httpStatus.NOT_FOUND).send({
			message: err.message,
		});
	}

	if (err.name === "BadRequestError") {
		return res.status(httpStatus.BAD_REQUEST).send({
			message: err.message,
		});
	}

	if (err.name === "BookNotFoundError") {
		return res.status(httpStatus.NOT_FOUND).send({
			message: err.message,
		});
	}

	console.error(err);
	res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
		error: "InternalServerError",
		message: "Internal Server Error",
	});
}
