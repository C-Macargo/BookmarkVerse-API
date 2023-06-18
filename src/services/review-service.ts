import { badRequestError } from "@/errors";
import { reviewRepository } from "@/repositories/review-repository";

async function createReview(userId: number, bookId: number, reviewText: string, reviewRating: number ) {
	if (!userId || !bookId) throw badRequestError();
	const review = await reviewRepository.createReview(userId, bookId, reviewText, reviewRating);
    return review
}

async function deleteReview(userId: number, reviewId: number) {
	if (!userId || !reviewId) throw badRequestError();
	const review = await reviewRepository.deleteReview(userId, reviewId);
    return review
}

async function editReview(userId: number, reviewId: number, reviewText: string, reviewRating: number) {
	if (!userId || !reviewId) throw badRequestError();
	const review = await reviewRepository.editReview(reviewId, reviewText, reviewRating);
    return review
}




export const reviewService = {
    createReview,
    deleteReview,
    editReview
};