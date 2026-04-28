const { expect } = require('chai');

const { BigCalculator } = require('../math');

describe('[UNIT] - PRECISION TEST', () => {
  it('[DIVIDE] - SHOULD BE RETURN IS NUMBER WITH CORRECT PRECISION', () => {
    const tests = [
      {
        f: 1,
        s: 0,
        expect: Infinity,
      },
      {
        f: 2000000,
        s: 682987.54,
        expect: 2.92831110,
      },
    ];

    for (let i = 0; i < tests.length; i += 1) {
      const test = tests[i];

      const result = BigCalculator.divide(test.f, test.s);

      expect(result).to.equal(test.expect);
    }
  });

  it('[MINUS] - SHOULD BE RETURN IS NUMBER WITH CORRECT PRECISION', () => {
    const tests = [
      {
        f: 0,
        s: 0,
        expect: 0,
      },
      {
        f: 1,
        s: 1,
        expect: 0,
      },
    ];

    for (let i = 0; i < tests.length; i += 1) {
      const test = tests[i];

      const result = BigCalculator.minus(test.f, test.s);

      expect(result).to.equal(test.expect);
    }
  });

  it('[FLOOR] - SHOULD BE RETURN IS NUMBER WITH CORRECT PRECISION', () => {
    const tests = [
      {
        in: 433.697087516,
        expect: 433.69708751,
        precision: 8,
      },
      {
        in: 433.697087516,
        expect: 433.69,
        precision: 2,
      },
    ];

    for (let i = 0; i < tests.length; i += 1) {
      const test = tests[i];

      const result = BigCalculator.floor(test.in, test.precision);

      expect(result).to.equal(test.expect);
    }
  });
});
