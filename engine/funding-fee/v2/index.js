const express = require('express');

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

require('dotenv').config('/');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const Sentry = require('engine/sentry/index');
const AppConfig = require('engine/config/app');
const Localize = require('engine/localize');

const { PORT } = AppConfig;
const { argv } = yargs(hideBin(process.argv));
const { ENV } = require('engine/config/app');
const { sequelize } = require('engine/database/models');

const healthCheck = require('./health-check');
const LogMessage = require('./log-message');
const Clock = require('./timer');
const Service = require('./service');

const { LIMIT } = require('./config');

const app = express();

const PERIOD_FEE = ENV === 'production' ? 5 : argv.periodFee || 5;

const sentry = new Sentry();

sentry.init();

app.use(healthCheck);

const calculateFundingFee = new Clock(PERIOD_FEE * 1000, async () => {
  try {
    const currentTime = new Localize().getLocalTime();
    if (!Service.isCalculateFundingFee(currentTime)) {
      return;
    }

    const futuresAssetStatuses = await Service.findFuturesAssetStatuses();
    if (!futuresAssetStatuses.length) {
      return;
    }

    const timeToNextFunding = Service.getTimeToNextFunding();

    const openedFuturesPositions = await Service.findOpenedFuturesPositions(
      timeToNextFunding,
      LIMIT,
    );
    if (!openedFuturesPositions.length) {
      return;
    }

    const openedFuturesPositionIds = openedFuturesPositions.map(
      (futuresPosition) => futuresPosition.id,
    );

    const assetStatusId = await Service.findAssetStatusId();
    const transactionFundingFee = await Service.calculateFundingFee(
      futuresAssetStatuses,
      assetStatusId,
      openedFuturesPositions,
    );

    await Service.createTransactions(transactionFundingFee);

    await Service.updateFuturesPositionTimestamps(openedFuturesPositionIds, timeToNextFunding);

    const newFundingRates = futuresAssetStatuses.filter((asset) => openedFuturesPositions.some(
      (position) => position.asset_pair === asset.asset_pair,
    ));

    const fundingRateHistories = await Service.futuresFundingRateHistory(
      newFundingRates,
      timeToNextFunding,
    );

    await Service.createFuturesFundingRates(fundingRateHistories);
  } catch (error) {
    sentry.captureError(error);
  }
});

const reconnect = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => { setTimeout(resolve, delay); });
      calculateFundingFee.run();

      return;
    } catch (error) {
      sentry.captureError(error);

      if (i === retries - 1) {
        process.exit(1);
      }
    }
  }
};

const init = async () => {
  try {
    app.listen(PORT);

    calculateFundingFee.run();
  } catch (error) {
    sentry.captureError(error);

    await reconnect();
  }
};

init();

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
