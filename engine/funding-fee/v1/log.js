const Sentry = require('@sentry/node');

const { ENV } = require('engine/config/app');

class Log {
  static handleError(err) {
    if (ENV === 'local') {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (['dev', 'develop', 'prod', 'production'].includes(ENV)) {
      Sentry.captureException(err);
    }
  }
}

module.exports = Log;
