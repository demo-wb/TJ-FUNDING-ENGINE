module.exports = {
  extends: 'airbnb-base',
  globals: {
    describe: true,
    it: true,
    before: true,
    beforeEach: true,
  },
  ignorePatterns: ['server/timer.js'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
  },
};
