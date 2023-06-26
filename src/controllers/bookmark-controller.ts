import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { errorHandler } from "@/middlewares/error-handler-middleware";
import { bookmarkService } from "@/services/bookmark-service";
import { ApplicationError } from "@/utils/protocols";
import { Response } from "express";
import httpStatus from "http-status";

export async function findBookmarks(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	try {
		const bookmarks = await bookmarkService.findBookmarks(userId);
		return res.status(httpStatus.OK).send({bookmarkIds:bookmarks});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function createBookmark(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	const { bookId } = req.body as { bookId: number };
	try {
		const bookmarks = await bookmarkService.createBookmark(userId, bookId);
		return res.status(httpStatus.CREATED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function removeBookmark(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	const { bookId } = req.body as { bookId: number };
	try {
		const bookmarks = await bookmarkService.removeBookmark(userId, bookId);
		return res.status(httpStatus.ACCEPTED).send({});
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}

}



