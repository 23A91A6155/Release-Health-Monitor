import 'dotenv/config';
import './config/sentry';

import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';

import { itemsRouter } from './routes/items';
import { errorsRouter } from './routes/errors';
import { healthRouter } from './routes/health';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// CORS: allow frontend URL (Render) + localhost for dev
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/items', itemsRouter);
app.use('/api/error', errorsRouter);
app.use('/health', healthRouter);

Sentry.setupExpressErrorHandler(app);

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
