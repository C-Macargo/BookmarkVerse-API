import authController from "@/controllers/auth-controller";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);


export default authRouter