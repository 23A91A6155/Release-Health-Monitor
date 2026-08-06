import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
  environment: process.env.SENTRY_ENVIRONMENT || 'development',
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

console.log(`[Sentry] Initialized for release: ${process.env.SENTRY_RELEASE}`);
