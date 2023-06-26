import { createBookmark, findBookmarks, removeBookmark } from "@/controllers/bookmark-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const bookmarkRouter = Router();

bookmarkRouter.get('/find',authenticateToken, findBookmarks)
bookmarkRouter.post('/create',authenticateToken, createBookmark)
bookmarkRouter.delete('/delete',authenticateToken, removeBookmark)


export default bookmarkRouter;
