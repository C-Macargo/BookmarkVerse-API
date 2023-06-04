import authController from "@/controllers/auth-controller";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/register', authController.registerUser);


export default authRouter