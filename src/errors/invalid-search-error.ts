import { ApplicationError } from "../utils/protocols";

export function invalidSearchError(): ApplicationError {
  return {
    name: 'InvalidSearchError',
    message: 'Nothing was found for this search!',
  };
}
