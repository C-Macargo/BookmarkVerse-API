import { duplicatedEmailError, invalidCredentialsError } from "../errors";
import {
	AuthLoginRequestBody,
	AuthRegisterRequestBody,
} from "../utils/protocols";
import bcrypt from "bcrypt";
import { authRepository } from "../repositories/auth-repository";
import jwt from "jsonwebtoken";

interface LoginResponse {
    data: {
        id: number;
        picture_url: string;
    };
    token: string;
}

async function createUser({
	email,
	password,
	name,
	picture_url,
}: AuthRegisterRequestBody) {
	const emailExists = await authRepository.findUserByEmail(email);
	if (emailExists) throw duplicatedEmailError();
	const hashedPassword = await bcrypt.hash(password, 12);
	const user = await authRepository.createUser(
		email,
		hashedPassword,
		name,
		picture_url
	);
	return user;
}

async function loginUser({
	email,
	password,
}: AuthLoginRequestBody): Promise<LoginResponse> {
	const user = await authRepository.findUserByEmail(email);
	if (!user) throw invalidCredentialsError();

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) throw invalidCredentialsError();
	const data = await authRepository.findUserData(email);
	const session = await authRepository.findSessionByUserId(user.id as number);
	if (!session || isTokenExpired(session.token)) {
		const newToken = jwt.sign(
			{ user_id: user.id },
			process.env.SECRET_KEY!,
			{ expiresIn: process.env.TOKEN_EXPIRATION }
		);
		await authRepository.upsertSessionToken(user.id, newToken);
		return { data, token: newToken };

	}
    return { data, token: session.token };
}

function isTokenExpired(token: string): boolean {
	const decoded = jwt.decode(token) as { exp: number } | null;
	if (!decoded) return true;
	return decoded.exp < Math.floor(Date.now() / 1000);
}

export const authService = {
	createUser,
	loginUser,
};
