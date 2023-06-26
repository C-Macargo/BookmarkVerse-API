import { findBooks, findPopularBooks, findSpecificBook } from "@/controllers/book-controller";
import { validateSchema } from "@/middlewares/schema-validation-middleware";
import bookSchema from "@/schemas/book.schema";
import { Router } from "express";

const bookRouter = Router()

bookRouter.get('/find/popular', findPopularBooks)
bookRouter.get('/find/:googleBooksId', findSpecificBook);
bookRouter.post('/find',validateSchema(bookSchema.booksSchema), findBooks);


export default bookRouter