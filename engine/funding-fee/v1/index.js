/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
require('dotenv').config('/');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const Sentry = require('@sentry/node');

const { argv } = yargs(hideBin(process.argv));
const { SENTRY_DSN, ENV } = require('engine/config/app');
const { sequelize } = require('engine/database/models');

const Localize = require('engine/localize');
const LogMessage = require('./log-message');
const Clock = require('./timer');
const Service = require('./service');
const Log = require('./log');

const ASSET_PAIR = argv.assetPair;
const PERIOD_FEE = ENV === 'production' ? 60 : argv.periodFee || 60;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1,
});

const calculateFundingFee = new Clock(PERIOD_FEE * 1000, async () => {
  try {
    const currentTime = new Localize().getLocalTime();
    if (!Service.isCalculateFundingFee(currentTime) || !ASSET_PAIR) {
      return;
    }

    const futuresAssetStatus = await Service.findFuturesAssetStatus(ASSET_PAIR);
    if (!futuresAssetStatus) {
      return;
    }

    const openedFuturesPositions = await Service.findOpenedFuturesPositions(ASSET_PAIR);
    if (!openedFuturesPositions.length) {
      return;
    }

    const assetStatusId = await Service.findAssetStatusId();
    const transactionFundingFee = await Service.calculateFundingFee(
      ASSET_PAIR,
      futuresAssetStatus,
      assetStatusId,
      openedFuturesPositions,
    );

    await Service.createTransactions(transactionFundingFee);
    await Service.futuresFundingRateHistory(ASSET_PAIR, futuresAssetStatus.funding_rate);
  } catch (err) {
    Log.handleError(err);
  }
});

calculateFundingFee.run();

const shutdownSocket = () => {
  sequelize.close().then(() => {
    LogMessage.log('Web socket is closed');
  });

  setTimeout(() => {
    process.exit(0);
  }, 1000);

  setTimeout(() => {
    process.exit(1);
  }, 4000);
};

process.on('SIGTERM', shutdownSocket);
process.on('SIGINT', shutdownSocket);
