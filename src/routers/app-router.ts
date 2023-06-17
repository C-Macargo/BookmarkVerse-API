import { Router } from 'express';
import authRouter from './auth-router';
import bookRouter from './book.router';
import bookmarkRouter from './bookmark-router';
import reviewRouter from './review-router';

const appRouter = Router();

appRouter.use('/auth', authRouter)
appRouter.use('/book', bookRouter)
appRouter.use('/bookmark', bookmarkRouter)
appRouter.use('/review', reviewRouter)

export default appRouter;