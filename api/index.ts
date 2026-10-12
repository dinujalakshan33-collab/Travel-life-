import express from 'express';
import cookieParser from 'cookie-parser';
import { apiRouter } from '../server/routes';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Mount the authentication and admin API routes
app.use('/api', apiRouter);

// Export Express app as Vercel serverless function handler
export default app;
