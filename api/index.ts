import express from 'express';
import cookieParser from 'cookie-parser';
import { apiRouter } from '../server/routes';

const app = express();

app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Mount the authentication and admin API routes
app.use('/api', apiRouter);

// Export Express app as Vercel serverless function handler
export default app;
