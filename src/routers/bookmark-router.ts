import bookmarkController from "@/controllers/bookmark-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const bookmarkRouter = Router();

bookmarkRouter.get('/find',authenticateToken, bookmarkController.findBookmarks)

export default bookmarkRouter;
