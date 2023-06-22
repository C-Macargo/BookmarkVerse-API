import { faker } from "@faker-js/faker";
import prisma from "@/config/database";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function createUser() {
	const user = await prisma.user.create({
		data: {
			name: faker.internet.userName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
			picture_url: faker.image.imageUrl(),
		},
	});

	return user;
}

export async function createLogin(params: Partial<User> = {}): Promise<User> {
	const incomingPassword = params.password || faker.internet.password(6);
	const hashedPassword = await bcrypt.hash(incomingPassword, 10);

	return prisma.user.create({
		data: {
			name:faker.internet.userName(),
			password: hashedPassword,
			email: params.email || faker.internet.email(),
			picture_url: faker.image.imageUrl(),

		},
	});
}

export const registerValidBody = {
	name: faker.internet.userName(),
	password: faker.internet.password(6),
	email: faker.internet.email(),
	picture_url: faker.image.imageUrl(),
};
