const axios = require('axios');

const { PRICE_SOCKET_URL, PRICE_SOCKET_SECRET, ENV } = require('engine/config/app');

const Log = require('./log');

class SocketBroadCast {
  static async futuresFundingRate(payloads) {
    if (ENV === 'test') {
      return;
    }

    const message = {
      room: 'public',
      event: 'futures_funding_rate',
      payloads,
    };

    await this.broadcast(message);
  }

  static async broadcast(message) {
    try {
      await axios.post(
        `${PRICE_SOCKET_URL}/event`,
        message,
        {
          headers: {
            Authorization: `Bearer ${PRICE_SOCKET_SECRET}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      Log.handleError(err);
    }
  }
}

module.exports = SocketBroadCast;
