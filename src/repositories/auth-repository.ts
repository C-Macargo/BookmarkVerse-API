import prisma from "@/config/database";

async function findUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
}

async function findUserData(email: string){
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		select:{
			id:true,
			picture_url:true
		}
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

async function upsertSessionToken(userId: number, newToken: string): Promise<void> {
    await prisma.session.upsert({
        where: { user_id: userId },
        create: {
            user_id: userId,
            token: newToken,
        },
        update: { token: newToken },
    });
}


  async function findSessionByUserId(id: number) {
	const session = await prisma.session.findUnique({
	  where: {
		user_id:id,
	  },
	});
  
	return session;
  }
  


export const authRepository = {
	findUserByEmail,
	createUser,
	upsertSessionToken,
	findSessionByUserId,
	findUserData
};
