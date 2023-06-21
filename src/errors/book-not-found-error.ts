import { ApplicationError } from "../utils/protocols";

export function bookNotFoundError(): ApplicationError {
  return {
    name: 'BookNotFoundError',
    message: 'Book could not be found!',
  };
}
