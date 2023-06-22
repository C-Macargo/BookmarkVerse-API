import prisma from "@/config/database";
import { apiBook } from "@/utils/protocols";
import { Book } from "@prisma/client";

async function getExistingBookIds(googleBooksIds: string[]): Promise<string[]> {
	const existingBooks = await prisma.book.findMany({
		where: {
			google_books_id: {
				in: googleBooksIds,
			},
		},
	});

	return existingBooks.map((book) => book.google_books_id);
}

async function insertBooks(newBooks: apiBook[]) {
	const createdBooks = newBooks.map((book) =>
		prisma.book.create({
			data: {
				google_books_id: book.id,
				title: book.volumeInfo.title,
				authors: book.volumeInfo.authors,
				description: book.volumeInfo.description,
				thumbnail: book.volumeInfo.imageLinks?.thumbnail,
				published_date: book.volumeInfo.publishedDate,
				subtitle: book.volumeInfo.subtitle,
				language: book.volumeInfo.language,
			},
		})
	);

	await Promise.all(createdBooks);
}

async function findSpecificBook(googleBooksId: string): Promise<Book | null> {
	const book = await prisma.book.findUnique({
		where: {
			google_books_id: googleBooksId,
		},
	});

	return book;
}

async function findBookById(bookId: number): Promise<Book | null> {
	const book = await prisma.book.findUnique({
		where: {
			id: bookId,
		},
	});

	return book;
}

async function getPopularBooks() {
    const popularBooks = await prisma.$queryRaw`
        SELECT "Book".title, "Book".thumbnail, "Book".id, "Book".google_books_id,
        CAST(COUNT("Bookmark".id) AS INTEGER) as bookmark_count
        FROM "Book"
        LEFT JOIN "Bookmark" ON "Book".id = "Bookmark".book_id
        GROUP BY "Book".id, "Book".title, "Book".thumbnail
        ORDER BY bookmark_count DESC
        LIMIT 8;
    `;

    return popularBooks;
}




export const bookRepository = {
	insertBooks,
	getExistingBookIds,
	findSpecificBook,
	findBookById,
	getPopularBooks,
};
