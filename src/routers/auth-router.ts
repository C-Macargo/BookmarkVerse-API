import { loginUser, registerUser } from "@/controllers/auth-controller";
import { validateSchema } from "@/middlewares/schema-validation-middleware";
import authSchema from "@/schemas/auth.schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', validateSchema(authSchema.registerSchema), registerUser);
authRouter.post('/login', validateSchema(authSchema.loginSchema), loginUser);

export default authRouter;
