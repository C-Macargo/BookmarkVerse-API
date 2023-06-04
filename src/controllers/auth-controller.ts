import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler-middleware";
import { AuthRequestBody } from "../utils/protocols";
import { ApplicationError } from "../utils/protocols";
import httpStatus from "http-status";
import { authService } from "@/services/auth-service";

async function registerUser(req: Request, res: Response) {
  const { email, password, name, picture_url }: AuthRequestBody = req.body;
  try {
    const user = await authService.createUser({ email, password, name, picture_url });
    return res.status(httpStatus.CREATED).send({});
  } catch (err: unknown) {
    const error = err as ApplicationError | Error;
    errorHandler(error, req, res);
  }
}


export default {
  registerUser,
}
