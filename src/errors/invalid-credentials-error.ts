import { ApplicationError } from "../utils/protocols";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Invalid email or password!',
  };
}
