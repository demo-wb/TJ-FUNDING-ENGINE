const moment = require('moment');

const { Op } = require('sequelize');
const Localize = require('engine/localize');
const helper = require('engine/helper/util');
const { BigCalculator: BC } = require('engine/helper/math');

const Repository = require('./repository');
const CONFIG = require('./config');

class Service {
  static async findOpenedFuturesPositions(timeToNextFunding, limit) {
    const filter = {
      status: CONFIG.POSITION_STATUS.OPENED,
      [Op.or]: [
        {
          funded_at: {
            [Op.lt]: timeToNextFunding,
          },
        },
        {
          funded_at: {
            [Op.eq]: null,
          },
        },
      ],
    };

    const openedFuturesPositions = await Repository.findFuturesPositions(filter, limit);

    return openedFuturesPositions;
  }

  static async findAssetStatusId() {
    const filter = { asset: CONFIG.ASSET.USDT };

    const assetStatus = await Repository.findAssetStatus(filter);

    return assetStatus.id || 0;
  }

  static calculateFundingFee(
    futuresAssetStatuses,
    assetStatusId,
    openedFuturesPositions,
  ) {
    const fundingFeeTransactions = [];
    const futuresAssetTransaction = openedFuturesPositions.map((position, index) => {
      const futuresAssetStatus = futuresAssetStatuses.find(
        ((assetStatus) => assetStatus.asset_pair === position.asset_pair),
      );
      if (futuresAssetStatus) {
        const {
          mark_price: markPrice,
          funding_rate: fundingRate,
          asset_pair: assetPair,
          business_key: businessKey,
          id,
        } = futuresAssetStatus;

        const now = new Localize().getLocalTime();
        const createdAt = moment(now).utc(false).format('YYYY-MM-DD HH:00:00');

        const nominalValueOfPositions = BC.multiply(markPrice, position.current_quantity);
        const payToOppositeSide = position.side_value * -1;

        const fundingAmount = BC.round(BC.multiply(
          nominalValueOfPositions,
          fundingRate,
          payToOppositeSide,
        ), 8);

        const {
          FEATURES,
          FUNCTION,
          TRANSACTION,
        } = CONFIG.BUSINESS_KEY;

        const txId = `${FEATURES.FUTURES}${FUNCTION.TRADE}${businessKey}${TRANSACTION.FUNDING_FEE}${helper.randomIntegers(6)}`;

        const fundingFeeTransaction = {
          user_id: position.user_id,
          tx_id: txId,
          tx_type: CONFIG.TX_TYPE.FUNDING_FEE,
          asset_pair: assetPair,
          base_asset: position.base_asset,
          quote_asset: position.quote_asset,
          futures_asset_status_id: id,
          asset: position.quote_asset,
          asset_status_id: assetStatusId,
          fee: fundingRate,
          fee_amount: BC.negated(fundingAmount),
          amount: fundingAmount,
          amount_before_deduct_fee: fundingAmount,
          created_microseconds: now.getTime() + index,
          status: CONFIG.STATUS.APPROVED,
          ref_futures_positions_id: position.id,
          created_at: createdAt,
        };

        fundingFeeTransactions.push(fundingFeeTransaction);

        return fundingFeeTransaction;
      }
      return fundingFeeTransactions;
    });

    return futuresAssetTransaction;
  }

  // static isCalculateFundingFee(currentTime) {
  //   const timeToUpdate = moment(currentTime).utc(false).format('YYYY-MM-DD HH:mm:00');
  //   const hour = moment(timeToUpdate).hour();
  //   const minute = moment(timeToUpdate).minute();

  //   const timeToCalculateFundingFee = [0, 8, 16];
  //   const timeOverLapOneMinute = 0;

  //   return timeToCalculateFundingFee.includes(hour) && (timeOverLapOneMinute === minute);
  // }

  static isCalculateFundingFee(currentTime) {
    const second = moment(currentTime).second();

    return (second % 10 === 0);
}


  static async createTransactions(transactions) {
    await Repository.createFuturesAssetTransactions(transactions);
  }

  static async futuresFundingRateHistory(newFundingRate, timeToNextFunding) {
    const unixTimeToCreated = moment()
      .utc(false)
      .set({ minute: 0, second: 0, millisecond: 0 })
      .unix();
    const timeToCreated = new Localize(new Date(unixTimeToCreated * 1000)).getLocalTime();

    const fundingRateHistories = [];

    for (let i = 0; i < newFundingRate.length; i += 1) {
      const newFundingRateItem = newFundingRate[i];
      const { asset_pair: assetPair } = newFundingRateItem;

      // eslint-disable-next-line no-await-in-loop
      const futuresAssetStatus = await Repository.findFuturesAssetStatus({ asset_pair: assetPair });
      if (futuresAssetStatus) {
        let { funding_rate: fundingRate } = newFundingRateItem;
        if (futuresAssetStatus.is_force_funding_rate) {
          fundingRate = futuresAssetStatus.funding_rate;
        }

        const data = {
          asset_pair: assetPair,
          base_asset: futuresAssetStatus.base_asset,
          quote_asset: futuresAssetStatus.quote_asset,
          interval: CONFIG.FUNDING_RATE.INTERVAL,
          time_to_next_funding: timeToNextFunding,
          funding_rate: parseFloat(fundingRate),
          interest_rate: futuresAssetStatus.interest_rate,
          current_funding_cap: futuresAssetStatus.current_funding_cap,
          current_funding_floor: futuresAssetStatus.current_funding_floor,
          default_funding_cap: futuresAssetStatus.default_funding_cap,
          default_funding_floor: futuresAssetStatus.default_funding_floor,
          created_at: timeToCreated,
        };

        fundingRateHistories.push(data);
      }
    }

    return fundingRateHistories;
  }

  static async findFuturesAssetStatuses() {
    const futuresAssetStatuses = await Repository.findFuturesAssetStatuses();

    return futuresAssetStatuses;
  }

  static async createFuturesFundingRates(transactions) {
    await Repository.createFuturesFundingRates(transactions);
  }

  static async updateFuturesPositionTimestamps(positionIds, timeToNextFunding) {
    const data = {
      funded_at: timeToNextFunding,
    };

    const filter = {
      id: positionIds,
    };

    await Repository.updateFuturesPositionTimestamps(data, filter);
  }

  static getTimeToNextFunding() {
    const unixTimeToNextFunding = moment()
      .utc(false)
      .set({ minute: 0, second: 0, millisecond: 0 })
      .add(8, 'h')
      .unix();

    const timeToNextFunding = new Localize(new Date(unixTimeToNextFunding * 1000)).getLocalTime();

    return timeToNextFunding;
  }
}

module.exports = Service;
