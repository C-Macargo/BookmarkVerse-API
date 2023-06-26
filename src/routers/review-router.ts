import { createReview, deleteReview, editReview, getBookReviews } from "@/controllers/review-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const reviewRouter = Router();

reviewRouter.get('/find/:bookId', getBookReviews);
reviewRouter.post('/create',authenticateToken, createReview)
reviewRouter.delete('/delete/:reviewId', authenticateToken, deleteReview);
reviewRouter.put('/edit/:reviewId', authenticateToken, editReview);


export default reviewRouter;
