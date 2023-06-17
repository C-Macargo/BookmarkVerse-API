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

export const reviewRepository = {
	createReview,
};
