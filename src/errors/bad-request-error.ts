import { ApplicationError } from "../utils/protocols";

export function badRequestError(): ApplicationError {
  return {
    name: 'BadRequestError',
    message: 'Bad request invalid format!',
  };
}