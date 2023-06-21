import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "@/errors";
import prisma from "@/config/database";

export async function authenticateToken(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.header("Authorization");
	if (!authHeader) return generateUnauthorizedResponse(res);

	const token = authHeader.split(" ")[1];
	if (!token) return generateUnauthorizedResponse(res);

	try {
		const { id } = jwt.verify(token, process.env.SECRET_KEY) as JWTPayload;

		const session = await prisma.session.findFirst({
			where: {
				token,
			},
		});
		if (!session) return generateUnauthorizedResponse(res);
		req.userId = session.user_id;
		return next();
	} catch (err) {
		return generateUnauthorizedResponse(res);
	}
}

function generateUnauthorizedResponse(res: Response) {
	res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export interface AuthenticatedRequest extends Request {
	userId: number; 
}

interface JWTPayload {
	id: number;
}
