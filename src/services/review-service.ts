import { badRequestError } from "@/errors";
import { reviewRepository } from "@/repositories/review-repository";

async function createReview(userId: number, bookId: number, reviewText: string, reviewRating: number ) {
	if (!userId || !bookId) throw badRequestError();
	const bookmark = await reviewRepository.createReview(userId, bookId, reviewText, reviewRating);
    return bookmark
}

async function deleteReview(userId: number, reviewId: number) {
	if (!userId || !reviewId) throw badRequestError();
	const bookmark = await reviewRepository.deleteReview(userId, reviewId);
    return bookmark
}




export const reviewService = {
    createReview,
    deleteReview
};