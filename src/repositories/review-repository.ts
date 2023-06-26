import prisma from "@/config/database";

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

async function editReview(
	reviewId: number,
	reviewText: string,
	reviewRating: number
) {
	const updatedReview = await prisma.review.update({
		where: {
			id: reviewId,
		},
		data: {
			text: reviewText,
			rating: reviewRating,
		},
	});
	return updatedReview;
}

async function findBookReviews(bookId: number, currentPage: number) {
	const reviewsPerPage = 10;
	const skip = (currentPage - 1) * reviewsPerPage;
	const reviews = await prisma.review.findMany({
		where: {
			book_id: bookId,
		},
		select: {
			id: true,
			rating: true,
			text: true,
			user: {  
				select: {
					name: true,
					picture_url: true
				}
			}
		},
		skip: skip,
		take: reviewsPerPage,
	});

	const totalReviews = await prisma.review.count({
		where: {
			book_id: bookId,
		},
	});

	return {
		totalReviews,
		currentPage,
		reviewsPerPage,
		reviews,
	};
}

export const reviewRepository = {
	createReview,
	deleteReview,
	editReview,
	findBookReviews,
};
