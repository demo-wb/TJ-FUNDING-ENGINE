const BigNumber = require('bignumber.js');

BigNumber.config({
  DECIMAL_PLACES: 8,
  ROUNDING_MODE: BigNumber.ROUND_FLOOR,
});

const BigCalculator = {
  plus: (...args) => args.slice(1).reduce((total, acc) => {
    const currentNumber = new BigNumber(acc);

    const result = +new BigNumber(total).plus(currentNumber);

    if (Object.is(result, -0)) {
      return 0;
    }

    return result;
  }, args[0]),

  minus: (...args) => args.slice(1).reduce((total, acc) => {
    const currentNumber = new BigNumber(acc);

    const result = +new BigNumber(total).minus(currentNumber);

    if (Object.is(result, -0)) {
      return 0;
    }

    return result;
  }, args[0]),

  multiply: (...args) => args.slice(1).reduce((total, acc) => {
    const currentNumber = new BigNumber(acc);

    const result = +new BigNumber(total).multipliedBy(currentNumber);

    if (Object.is(result, -0)) {
      return 0;
    }

    return +new BigNumber(total).multipliedBy(currentNumber);
  }, args[0]),

  divide: (number1, number2) => {
    const result = +new BigNumber(number1).dividedBy(new BigNumber(number2));

    if (Object.is(result, -0)) {
      return 0;
    }

    return result;
  },

  pow: (number1, number2) => (+new BigNumber(number1).pow(new BigNumber(number2))),

  floor: (number, precision = 2) => (+new BigNumber(number).toFixed(precision, 1)),

  round: (number, precision = 2) => (+new BigNumber(number).toFixed(precision, 0)),

  negated: (number) => (+new BigNumber(number).negated()),

  isZero: (number) => (new BigNumber(number).isZero()),

  absolute: (number) => (+new BigNumber(number).absoluteValue()),
};

module.exports = {
  BigNumber,
  BigCalculator,
};
