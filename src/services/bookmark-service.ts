import { badRequestError, bookNotFoundError } from "@/errors";
import { bookRepository } from "@/repositories/book-repository";
import { bookmarkRepository } from "@/repositories/bookmark-repository";

async function findBookmarks(userId: number) {
	if (!userId) throw badRequestError();
	const bookmarks = await bookmarkRepository.findBookmarkByUserId(userId);
	return bookmarks;
}

async function createBookmark(userId: number, bookId: number) {
	if (!userId || !bookId) throw badRequestError();
	const book = await bookRepository.findBookById(bookId);
	if (!book) return bookNotFoundError();
	const existingBookmark = await bookmarkRepository.bookmarkExists(userId, bookId);
	if (existingBookmark) throw badRequestError()
	const bookmark = await bookmarkRepository.createBookmark(userId, bookId);
	return bookmark;
}

async function removeBookmark(userId: number, bookId: number) {
	if (!userId || !bookId) throw badRequestError();
	const book = await bookRepository.findBookById(bookId);
	if (!book) return bookNotFoundError();
	const existingBookmark = await bookmarkRepository.bookmarkExists(userId, bookId);
	if (!existingBookmark) throw badRequestError();
	const bookmark = await bookmarkRepository.removeBookmark(userId, bookId);
	return bookmark;
}

export const bookmarkService = {
	findBookmarks,
	createBookmark,
	removeBookmark,
};
