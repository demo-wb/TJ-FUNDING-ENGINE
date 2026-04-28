let now;

if (global.process && process.hrtime) {
  const hrTime = process.hrtime;

  now = () => {
    const hr = hrTime();

    return (hr[0] * 1000000 + hr[1]);
  };
} else if (global.performance && performance.now) {
  const { timing } = performance;
  const start = (timing && timing.navigationStart) || Date.now();

  now = () => (start + performance.now()) * 1e3;
} else {
  now = () => Date.now() * 1e3;
}

module.exports = now;
