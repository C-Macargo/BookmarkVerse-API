import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { errorHandler } from "@/middlewares/error-handler-middleware";
import { reviewService } from "@/services/review-service";
import { ApplicationError } from "@/utils/protocols";
import { Response } from "express";
import httpStatus from "http-status";

async function createReview(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
    const { bookId, reviewText, reviewRating } : { bookId: number, reviewText: string, reviewRating: number } = req.body;
	try {
		const reviews = await reviewService.createReview(userId, bookId);
		return res.status(httpStatus.CREATED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}


export default {
    createReview
};