import authController from "@/controllers/auth-controller";
import { validateSchema } from "@/middlewares/schema-validation-middleware";
import authSchema from "@/schemas/auth.schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', validateSchema(authSchema.registerSchema), authController.registerUser);
authRouter.post('/login', validateSchema(authSchema.loginSchema), authController.loginUser);

export default authRouter;
