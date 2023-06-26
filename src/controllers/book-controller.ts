import { errorHandler } from "@/middlewares/error-handler-middleware";
import { bookService } from "@/services/book-service";
import { ApplicationError } from "@/utils/protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function findBooks(req: Request, res: Response) {
	const { title } = req.body as { title: string };
	try {
		const books = await bookService.findBooks(title);
		return res.status(httpStatus.OK).send(books);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function findSpecificBook(req: Request, res: Response) {
	const googleBooksId: string = req.params.googleBooksId;
	try {
		const book = await bookService.findSpecificBook(googleBooksId);
		return res.status(httpStatus.OK).send(book);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}

export async function findPopularBooks(req: Request, res: Response) {
	try {
		const books = await bookService.findPopularBook();
		return res.status(httpStatus.OK).send(books);
	} catch (err: unknown) {
		const error = err as ApplicationError | Error;
		errorHandler(error, req, res);
	}
}


