import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { UserEntity } from "@/utils/protocols";
import prisma from "@/config/database";

export async function createUser(params: Partial<UserEntity> = {}) {
	const incomingPassword = params.password || faker.internet.password(6);

	return await prisma.user.create({
		data: {
			name: faker.name.fullName(),
			email: params.email || faker.internet.email(),
			picture_url: faker.image.imageUrl(),
			password: incomingPassword,
		},
	});
}

export async function loginUser(token: string, userId: number) {
	return await prisma.session.create({
		data: {
			token,
			user_id: userId,
		},
	});
}
