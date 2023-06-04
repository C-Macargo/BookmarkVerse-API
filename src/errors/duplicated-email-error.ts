import { ApplicationError } from "../utils/protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'Email is already registered!',
  };
}