import { Router } from 'express';
import authRouter from './auth-router';
import bookRouter from './book.router';
import bookmarkRouter from './bookmark-router';

const appRouter = Router();

appRouter.use('/auth', authRouter)
appRouter.use('/book', bookRouter)
appRouter.use('/bookmark', bookmarkRouter)

export default appRouter;