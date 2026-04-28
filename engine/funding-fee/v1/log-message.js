const axios = require('axios');

const { ENV } = require('engine/config/app');

class LogMessage {
  static log(message) {
    // eslint-disable-next-line no-console
    console.log(message);
  }

  static notifySlack(message) {
    try {
      // eslint-disable-next-line no-console
      console.log(message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  static notifySlackWithBlockMessage(blockMessage) {
    try {
      // eslint-disable-next-line no-console
      console.log(blockMessage);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}

module.exports = LogMessage;
