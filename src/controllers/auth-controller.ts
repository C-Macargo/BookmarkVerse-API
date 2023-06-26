import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler-middleware";
import {
	AuthLoginRequestBody,
	AuthRegisterRequestBody,
} from "../utils/protocols";
import { ApplicationError } from "../utils/protocols";
import httpStatus from "http-status";
import { authService } from "@/services/auth-service";

export async function registerUser(req: Request, res: Response) {
	const { email, password, name, picture_url }: AuthRegisterRequestBody =
		req.body;
	try {
		const user = await authService.createUser({
			email,
			password,
			name,
			picture_url,
		});
		return res.status(httpStatus.CREATED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function loginUser(req: Request, res: Response) {
	const { email, password }: AuthLoginRequestBody = req.body;
	try {
		const userData = await authService.loginUser({ email, password});
		return res.status(httpStatus.OK).send(userData);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

