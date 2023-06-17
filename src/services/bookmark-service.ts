import { badRequestError } from "@/errors";
import { bookmarkRepository } from "@/repositories/bookmark-repository";

async function findBookmarks(userId: number) {
	const bookmarks = await bookmarkRepository.findBookmarkByUserId(userId);
	return bookmarks;
}

async function createBookmark(userId: number, bookId: number) {
	if (!userId || !bookId) throw badRequestError();
	const bookmark = await bookmarkRepository.createBookmark(userId, bookId);
    return bookmark
}

async function removeBookmark(userId: number, bookId: number) {
	if (!userId || !bookId) throw badRequestError();
	const bookmark = await bookmarkRepository.removeBookmark(userId, bookId);
    return bookmark
}



export const bookmarkService = {
	findBookmarks,
	createBookmark,
	removeBookmark
};
