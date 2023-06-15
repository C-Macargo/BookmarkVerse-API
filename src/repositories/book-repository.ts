import { prisma } from "@/config";
import { Book } from "@/utils/protocols";

async function getExistingBookIds(googleBooksIds: string[]): Promise<string[]> {
    const existingBooks = await prisma.book.findMany({
        where: {
            google_books_id: {
                in: googleBooksIds
            }
        }
    });

    return existingBooks.map(book => book.google_books_id);
}

async function insertBooks(newBooks: Book[]) {
	const createdBooks = newBooks.map(book => prisma.book.create({
		data: {
			google_books_id: book.id,
			title: book.volumeInfo.title,
			authors: book.volumeInfo.authors,
			description: book.volumeInfo.description,
			thumbnail: book.volumeInfo.imageLinks?.thumbnail,
			published_date: book.volumeInfo.publishedDate,
			subtitle: book.volumeInfo.subtitle,
			language: book.volumeInfo.language,
		}
	}));

	await Promise.all(createdBooks);
}



export const bookRepository = {
	insertBooks,
	getExistingBookIds,
};

