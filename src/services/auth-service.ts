import { duplicatedEmailError } from "../errors";
import { AuthRequestBody } from "../utils/protocols";
import bcrypt from 'bcrypt';
import { authRepository } from "../repositories/auth-repository";


async function createUser({email, password, name, picture_url}: AuthRequestBody) {
  const emailExists = await authRepository.findUserByEmail(email);
  if (emailExists) throw duplicatedEmailError();
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await authRepository.createUser(email, hashedPassword, name, picture_url)
  return user
}

export const authService = {
  createUser,
};
