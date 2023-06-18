import { prisma } from "@/config";
import { apiBook } from "@/utils/protocols";
import { Book } from "@prisma/client";

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

async function insertBooks(newBooks: apiBook[]) {
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

async function findSpecificBook(googleBooksId: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
        where: {
            google_books_id: googleBooksId
        }
    });

    return book;
}



export const bookRepository = {
	insertBooks,
	getExistingBookIds,
	findSpecificBook
};

