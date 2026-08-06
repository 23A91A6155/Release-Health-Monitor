import { Router, Request, Response } from 'express';
import * as Sentry from '@sentry/node';

export const errorsRouter = Router();

errorsRouter.get('/unhandled', async (req: Request, res: Response) => {
  Promise.reject(new Error('Intentional Unhandled Promise Rejection - Backend v1.0.0'));
  res.status(500).json({ error: 'Triggered unhandled promise rejection' });
});

errorsRouter.get('/handled', async (req: Request, res: Response) => {
  try {
    throw new Error('Intentional Handled Error - Backend v1.1.0');
  } catch (err) {
    Sentry.captureException(err);
    res.status(500).json({ error: 'Handled error sent to Sentry' });
  }
});
