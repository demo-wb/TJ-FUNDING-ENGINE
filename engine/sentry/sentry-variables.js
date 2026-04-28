const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const AppConfig = require('engine/config/app');

const {
  SENTRY_DSN, ENV: environment,
} = AppConfig;

module.exports = {
  dsn: SENTRY_DSN,
  environment,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 0.01,
  profilesSampleRate: 0.01,
  sampleRate: 1.0,
};
