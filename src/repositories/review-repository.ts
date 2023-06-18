import { prisma } from "@/config";

async function createReview(
	userId: number,
	bookId: number,
	reviewText: string,
	reviewRating: number
) {
	const review = await prisma.review.create({
		data: {
			user_id: userId,
			book_id: bookId,
			text: reviewText,
			rating: reviewRating,
		},
	});
	return review;
}

async function deleteReview(userId: number, reviewId: number) {
	const deletedReview = await prisma.review.deleteMany({
		where: {
			id: reviewId,
			user_id: userId,
		},
	});
	return deletedReview;
}

async function editReview(reviewId: number, reviewText: string, reviewRating: number) {
        const updatedReview = await prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                text: reviewText,
                rating: reviewRating
            },
        });
        return updatedReview;
    } 

export const reviewRepository = {
	createReview,
	deleteReview,
	editReview
};
