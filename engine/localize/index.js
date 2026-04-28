const { UNIX_TIMEZONE } = require('engine/config/app');

class Localize {
  constructor(
    date = new Date(),
    unitTimeZone = UNIX_TIMEZONE,
  ) {
    this.date = date.getTime() + unitTimeZone;
  }

  getLocalTime() {
    const timezone = this.date;

    return new Date(timezone);
  }

  addTimeWithUnixTimestamp(unixTimestamp) {
    const addMinute = this.date + unixTimestamp;

    return new Date(addMinute);
  }
}

module.exports = Localize;
