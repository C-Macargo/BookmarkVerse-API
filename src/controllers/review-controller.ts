import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { errorHandler } from "@/middlewares/error-handler-middleware";
import { reviewService } from "@/services/review-service";
import { ApplicationError } from "@/utils/protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getBookReviews(req: Request, res: Response) {
	const bookId = Number(req.params.bookId);
	const currentPage = Number(req.query.page) || 1
	try {
		const reviews = await reviewService.getBookReviews(bookId, currentPage);
		return res.status(httpStatus.OK).send(reviews);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function createReview(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	const {
		bookId,
		reviewText,
		reviewRating,
	}: { bookId: number; reviewText: string; reviewRating: number } = req.body;
	try {
		const reviews = await reviewService.createReview(
			userId,
			bookId,
			reviewText,
			reviewRating
		);
		return res.status(httpStatus.CREATED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function deleteReview(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	const reviewId = Number(req.params);
	try {
		const reviews = await reviewService.deleteReview(userId, reviewId);
		return res.status(httpStatus.ACCEPTED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function editReview(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	const reviewId = Number(req.params);
	const {
		reviewText,
		reviewRating,
	}: { reviewText: string; reviewRating: number } = req.body;

	try {
		const reviews = await reviewService.editReview(
			userId,
			reviewId,
			reviewText,
			reviewRating
		);
		return res.status(httpStatus.ACCEPTED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

