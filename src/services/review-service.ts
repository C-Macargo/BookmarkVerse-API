import { badRequestError } from "@/errors";
import { reviewRepository } from "@/repositories/review-repository";

async function createReview(userId: number, bookId: number) {
	if (!userId || !bookId) throw badRequestError();
	const bookmark = await reviewRepository.createReview(userId, bookId);
    return bookmark
}



export const reviewService = {
    createReview
};