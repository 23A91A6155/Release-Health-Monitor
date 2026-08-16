import { Router, Request, Response } from 'express';
import * as Sentry from '@sentry/node';

export const errorsRouter = Router();

// v1.0.0 — Unhandled exception: throws directly without try-catch
// Sentry's global error handler captures this automatically
errorsRouter.get('/unhandled', (_req: Request, _res: Response) => {
  // Throw an unhandled error that will propagate to Express error handler
  // and be captured by Sentry.setupExpressErrorHandler(app)
  throw new Error('Intentional Unhandled Exception - Backend v1.0.0');
});

// v1.1.0 — Handled error: caught with try-catch, explicitly sent to Sentry
errorsRouter.get('/handled', async (_req: Request, res: Response) => {
  try {
    throw new Error('Intentional Handled Error - Backend v1.1.0');
  } catch (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    res.status(500).json({ error: 'Handled error sent to Sentry' });
  }
});
