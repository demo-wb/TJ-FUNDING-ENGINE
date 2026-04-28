require('dotenv').config('/');

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  BROADCAST_API: process.env.BROADCAST_API,
  PRICE_SOCKET_URL: process.env.PRICE_SOCKET_URL,
  PRICE_SOCKET_SECRET: process.env.PRICE_SOCKET_SECRET,
  UNIX_TIMEZONE: 0, // +0 Etc/UTC
  SENTRY_DSN: process.env.SENTRY_DSN,
};
