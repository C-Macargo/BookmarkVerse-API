import { bookNotFoundError, invalidSearchError } from "@/errors";
import { bookRepository } from "@/repositories/book-repository";
import searchBooks from "@/utils/external-api-request";
import { apiBook } from "@/utils/protocols";

async function findBooks(title: string) {
	try {
		const books = await searchBooks(title);
		if (!books) throw invalidSearchError();
		const googleBooksIds = books.items.map((book: apiBook) => book.id);
		const existingBookIds = await bookRepository.getExistingBookIds(
			googleBooksIds
		);
		const newBooks = books.items.filter(
			(book: apiBook) => !existingBookIds.includes(book.id)
		);
		if (newBooks.length > 0) {
			await bookRepository.insertBooks(newBooks);
		}
		return books;
	} catch (error) {
		console.error(`Error occurred while fetching books: ${error}`);
		throw invalidSearchError();
	}
}

async function findSpecificBook(googleBooksId: string) {
	const book = await bookRepository.findSpecificBook (googleBooksId);
	if (!book) throw bookNotFoundError();
	return book
}

async function findPopularBook(){
	const books = bookRepository.getPopularBooks()
	return books
}

export const bookService = {
	findBooks,
	findSpecificBook,
	findPopularBook
};
