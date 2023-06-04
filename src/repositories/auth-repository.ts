import { prisma } from "@/config";

async function findUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
}

async function createUser(
	email: string,
	password: string,
	name: string,
	picture_url: string
) {
	const user = await prisma.user.create({
		data: {
			email,
			password,
			name,
			picture_url,
		},
	});
	return user;
}

async function updateSessionToken(userId: number, newToken: string): Promise<void> {
	await prisma.user.update({
	  where: { id: userId },
	  data: { token: newToken },
	});
  }
  


export const authRepository = {
	findUserByEmail,
	createUser,
	updateSessionToken
};
