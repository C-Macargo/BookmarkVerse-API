import * as jwt from 'jsonwebtoken';
import { createUser, loginUser } from './factories/users-factory';
import { UserEntity } from './utils/protocols';

import prisma from '@/config/database';


export async function cleanDb() {
    await prisma.session.deleteMany({})
    await prisma.bookmark.deleteMany({})
    await prisma.review.deleteMany({})
    await prisma.book.deleteMany({})
    await prisma.user.deleteMany({})
}

export async function generateValidToken(user: UserEntity) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id}, process.env.SECRET_KEY);

    await loginUser(token, incomingUser.id);

    return token;
}