import bookmarkController from "@/controllers/bookmark-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const bookmarkRouter = Router();

bookmarkRouter.get('/find',authenticateToken, bookmarkController.findBookmarks)
bookmarkRouter.post('/create',authenticateToken, bookmarkController.createBookmark)


export default bookmarkRouter;
