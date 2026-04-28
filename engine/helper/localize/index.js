const CONFIG = require('engine/config/app');

const { UNIX_TIMEZONE } = CONFIG;

class Localize {
  constructor(
    date = new Date(),
    unitTimeZone = UNIX_TIMEZONE,
  ) {
    if (!date.getTime) {
      this.date = new Date(date);
      const localTimeOffset = this.date.getTimezoneOffset() * 60 * 1000;
      this.date = this.date.getTime() - localTimeOffset + unitTimeZone;
    }

    if (date.getTime) {
      const localTimeOffset = date.getTimezoneOffset() * 60 * 1000;
      this.date = date.getTime() - localTimeOffset + unitTimeZone;
    }
  }

  getLocalTime() {
    const timezone = this.date;

    return new Date(timezone);
  }

  addTimeWithUnixTimestamp(unixTimestamp) {
    const addMinute = this.date + unixTimestamp;

    return new Date(addMinute);
  }

  reduceTimeWithUnixTimestamp(unixTimestamp) {
    const reducedDate = this.date - unixTimestamp;

    return new Date(reducedDate);
  }

  getDayMonthYear() {
    const now = new Date(this.date);
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    return `${date}/${month}/${year}`;
  }

  getHours() {
    const now = new Date(this.date);
    const hours = now.getUTCHours();

    return hours;
  }

  setTimes(hours = 0, minutes = 0, seconds = 0) {
    const now = new Date(this.date);

    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
  }

  formatDateTime(year, month, date, hours, minutes, seconds) {
    return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

module.exports = Localize;
