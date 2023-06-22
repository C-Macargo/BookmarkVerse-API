import bookController from "@/controllers/book-controller";
import { validateSchema } from "@/middlewares/schema-validation-middleware";
import bookSchema from "@/schemas/book.schema";
import { Router } from "express";

const bookRouter = Router()

bookRouter.get('/find/popular', bookController.findPopularBooks)
bookRouter.get('/find/:googleBooksId', bookController.findSpecificBook);
bookRouter.post('/find',validateSchema(bookSchema.booksSchema), bookController.findBooks);


export default bookRouter