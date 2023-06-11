import { invalidSearchError } from "@/errors/invalid-search-error";
import searchBooks from "@/utils/external-api-request";

async function findBooks(title: string) {
	try {
		const books = await searchBooks(title);
		if (!books) throw invalidSearchError();
		return books;
	} catch (error) {
		console.error(`Error occurred while fetching books: ${error}`);
		throw invalidSearchError();
	}
}

export const bookService = {
	findBooks,
};
