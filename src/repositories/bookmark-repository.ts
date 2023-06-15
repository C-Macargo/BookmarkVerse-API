import { prisma } from "@/config";

async function findBookmarkByUserId(userId : number) {
	const bookmarks = await prisma.bookmark.findMany({
		where: {
			user_id: userId,
		},
        select: {
            book_id: true 
        }
	});

	return bookmarks;
}

export const bookmarkRepository = {
	findBookmarkByUserId,
};
