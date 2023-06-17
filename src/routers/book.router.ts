import bookController from "@/controllers/book-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const bookRouter = Router()

bookRouter.get('/find', bookController.findBooks);


export default bookRouter