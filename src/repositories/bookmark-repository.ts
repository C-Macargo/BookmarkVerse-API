import { prisma } from "@/config";

async function findBookmarkByUserId(userId: number) {
	const bookmarks = await prisma.bookmark.findMany({
		where: {
			user_id: userId,
		},
		select: {
			book_id: true,
		},
	});
	const bookIds = bookmarks.map((bookmark) => bookmark.book_id);

	return bookIds;
}

async function createBookmark(userId: number, bookId: number) {
	const bookmark = await prisma.bookmark.create({
		data: {
			user_id: userId,
			book_id: bookId,
		},
	});
	return bookmark;
}

async function removeBookmark(userId: number, bookId: number) {
	const removedBookmark = await prisma.bookmark.deleteMany({
		where: {
			user_id: userId,
			book_id: bookId,
		},
	});
	return removedBookmark;
}

export const bookmarkRepository = {
	findBookmarkByUserId,
	createBookmark,
	removeBookmark
};
