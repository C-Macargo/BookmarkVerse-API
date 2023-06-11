import { Router } from 'express';
import authRouter from './auth-router';
import bookRouter from './book.router';

const appRouter = Router();

appRouter.use('/auth', authRouter)
appRouter.use('/book', bookRouter)


export default appRouter;