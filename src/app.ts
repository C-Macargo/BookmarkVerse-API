import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb, disconnectDB } from "./config";
import appRouter from "./routers/app-router";
import { errorHandler } from "./middlewares/error-handler-middleware";



dotenv.config();
const app = express();

app.use(cors()).use(express.json()).use(appRouter);

app.get('/health', (_req, res) => res.send('OK!'))


export function init(): Promise<Express> {
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;
