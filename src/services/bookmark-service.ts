import { bookmarkRepository } from "@/repositories/bookmark-repository";

async function findBookmarks(userId: number) {
	const bookmarks = await bookmarkRepository.findBookmarkByUserId(userId);
    console.log(bookmarks)
    return bookmarks
}

export const bookmarkService = {
	findBookmarks,
};
