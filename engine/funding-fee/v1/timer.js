class Clock {
  constructor(duration, fn) {
    this.duration = duration;
    this.fn = fn;
    this.baseline = undefined;
    this.countTick = 0;
  }

  run() {
    if (this.baseline === undefined) {
      this.baseline = new Date().getTime();
    }

    this.fn();

    const end = new Date().getTime();

    this.baseline += this.duration;
    let factor = 0;
    if (this.countTick === 3600) {
      this.countTick = 0;
      factor = 100;
    }

    let nextTick = this.duration - (end - this.baseline) + factor;
    if (nextTick < 0) {
      nextTick = 0;
    }
    this.countTick += 1;

    ((i) => {
      // eslint-disable-next-line no-param-reassign
      i.timer = setTimeout(() => {
        i.run(end);
      }, nextTick);
    })(this);
  }
}

module.exports = Clock;
