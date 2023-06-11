import bookController from "@/controllers/book-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const bookRouter = Router()

bookRouter.post('/find', bookController.findBooks);


export default bookRouter