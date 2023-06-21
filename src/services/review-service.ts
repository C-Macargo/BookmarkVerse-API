import { badRequestError, bookNotFoundError } from "@/errors";
import { bookRepository } from "@/repositories/book-repository";
import { reviewRepository } from "@/repositories/review-repository";

async function createReview(userId: number, bookId: number, reviewText: string, reviewRating: number ) {
	if (!userId || !bookId) throw badRequestError();
    const book = await bookRepository.findBookById(bookId);
	if (!book) return bookNotFoundError();
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

async function getBookReviews(bookId: number, currentPage: number){
    const book = bookRepository.findBookById(bookId)
    if (!book) return bookNotFoundError()
    const reviews = await reviewRepository.findBookReviews(bookId, currentPage)
    return reviews
}



export const reviewService = {
    createReview,
    deleteReview,
    editReview,
    getBookReviews
};