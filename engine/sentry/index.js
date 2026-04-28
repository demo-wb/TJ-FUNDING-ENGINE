const Sentry = require('@sentry/node');

const AppConfig = require('engine/config/app');

const SENTRY_CONFIG = require('./sentry-variables');

const {
  ENV: environment,
} = AppConfig;

class SentryNode {
  init() {
    this.sentry = Sentry;

    this.sentry.init(SENTRY_CONFIG);
  }

  setupExpressErrorHandler(app) {
    this.sentry.setupExpressErrorHandler(app);
  }

  captureError(err) {
    if (environment === 'local') {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (['dev', 'develop', 'prod', 'production'].includes(environment)) {
      this.sentry.captureException(err);
    }
  }
}

module.exports = SentryNode;
