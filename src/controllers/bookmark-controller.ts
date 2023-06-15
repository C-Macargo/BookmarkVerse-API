import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { errorHandler } from "@/middlewares/error-handler-middleware";
import { bookmarkService } from "@/services/bookmark-service";
import { ApplicationError } from "@/utils/protocols";
import { Response } from "express";
import httpStatus from "http-status";

async function findBookmarks(req: AuthenticatedRequest, res: Response) {
	const { userId } = req as { userId: number };
	try {
		const bookmarks = bookmarkService.findBookmarks(userId);
		return res.status(httpStatus.OK).send(bookmarks);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export default {
	findBookmarks,
};
