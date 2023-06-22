import prisma from '@/config/database';


export async function cleanDb() {
    await prisma.session.deleteMany({})
    await prisma.bookmark.deleteMany({})
    await prisma.review.deleteMany({})
    await prisma.book.deleteMany({})
    await prisma.user.deleteMany({})
}

