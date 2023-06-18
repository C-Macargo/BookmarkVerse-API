import reviewController from "@/controllers/review-controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const reviewRouter = Router();

reviewRouter.post('/create',authenticateToken, reviewController.createReview)
reviewRouter.delete('/delete/:reviewId', authenticateToken, reviewController.deleteReview);
reviewRouter.put('/edit/:reviewId', authenticateToken, reviewController.editReview);


export default reviewRouter;
