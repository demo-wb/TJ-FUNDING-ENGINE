const Sentry = require('@sentry/node');

const SENTRY_CONFIG = require('./sentry-variables');

Sentry.init(SENTRY_CONFIG);
