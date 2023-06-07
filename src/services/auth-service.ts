import { duplicatedEmailError, invalidCredentialsError } from "../errors";
import { AuthLoginRequestBody, AuthRegisterRequestBody } from "../utils/protocols";
import bcrypt from 'bcrypt';
import { authRepository } from "../repositories/auth-repository";
import jwt from "jsonwebtoken";



async function createUser({email, password, name, picture_url}: AuthRegisterRequestBody) {
  const emailExists = await authRepository.findUserByEmail(email);
  if (emailExists) throw duplicatedEmailError();
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await authRepository.createUser(email, hashedPassword, name, picture_url)
  return user
}

async function loginUser({ email, password }: AuthLoginRequestBody): Promise<string> {
  const user = await authRepository.findUserByEmail(email);
  if (!user) throw invalidCredentialsError();

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw invalidCredentialsError();

  if (!user.token || isTokenExpired(user.token)) {
    const newToken = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY!, { expiresIn: '24h' });
    await authRepository.updateSessionToken(user.id, newToken);
    return newToken;
  }
  return user.token;
}

function isTokenExpired(token: string): boolean {
  const decoded = jwt.decode(token) as { exp: number } | null;
  if (!decoded) return true;
  return decoded.exp < Math.floor(Date.now() / 1000);
}

export const authService = {
  createUser,
  loginUser
};
