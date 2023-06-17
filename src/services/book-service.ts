import { invalidSearchError } from "@/errors";
import { bookRepository } from "@/repositories/book-repository";
import searchBooks from "@/utils/external-api-request";
import { Book } from "@/utils/protocols";

async function findBooks(title: string) {
	try {
		const books = await searchBooks(title);
		if (!books) throw invalidSearchError();
		const googleBooksIds = books.items.map((book: Book) => book.id);
		const existingBookIds = await bookRepository.getExistingBookIds(
			googleBooksIds
		);
		const newBooks = books.items.filter(
			(book: Book) => !existingBookIds.includes(book.id)
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

export const bookService = {
	findBooks,
};
