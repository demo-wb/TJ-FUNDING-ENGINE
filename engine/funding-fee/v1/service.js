const moment = require('moment');

const Localize = require('engine/localize');
const helper = require('engine/helper/util');
const { BigCalculator: BC } = require('engine/helper/math');

const Repository = require('./repository');
const CONFIG = require('./config');
const SocketBroadCast = require('./socket-broadcast');

class Service {
  static async updateFundingRateIntoFutureAssetStatuses(fundingRate, assetPair) {
    const data = {
      funding_rate: fundingRate,
    };

    const filter = {
      asset_pair: assetPair,
    };

    await Repository.updateFuturesAssetStatus(filter, data);
  }

  static async findOpenedFuturesPositions(assetPair) {
    const filter = {
      asset_pair: assetPair,
      status: CONFIG.POSITION_STATUS.OPENED,
    };

    const openedFuturesPositions = await Repository.findFuturesPositions(filter);

    return openedFuturesPositions;
  }

  static async findFuturesAssetStatus(assetPair) {
    const filter = {
      asset_pair: assetPair,
    };

    const futuresAssetStatus = await Repository.findFuturesAssetStatus(filter);

    return futuresAssetStatus;
  }

  static async findAssetStatusId() {
    const filter = { asset: CONFIG.ASSET.USDT };

    const assetStatus = await Repository.findAssetStatus(filter);

    return assetStatus.id || 0;
  }

  static calculateFundingFee(
    assetPair,
    futuresAssetStatus,
    assetStatusId,
    openedFuturesPositions,
  ) {
    const {
      mark_price: markPrice,
      funding_rate: fundingRate,
      id,
    } = futuresAssetStatus;

    const futuresAssetTransaction = openedFuturesPositions.map((position) => {
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

      const txId = `${FEATURES.FUTURES}${FUNCTION.TRADE}${futuresAssetStatus.business_key}${TRANSACTION.FUNDING_FEE}${helper.randomIntegers(6)}`;

      return {
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
        created_microseconds: now.getTime(),
        status: CONFIG.STATUS.APPROVED,
        ref_futures_positions_id: position.id,
        created_at: createdAt,
      };
    });

    return futuresAssetTransaction;
  }

  static isCalculateFundingFee(currentTime) {
    const timeToUpdate = moment(currentTime).utc(false).format('YYYY-MM-DD HH:mm:00');
    const hour = moment(timeToUpdate).hour();
    const minute = moment(timeToUpdate).minute();

    const timeToCalculateFundingFee = [0, 8, 16];
    const timeOverLapOneMinute = 0;

    return timeToCalculateFundingFee.includes(hour) && (timeOverLapOneMinute === minute);
  }

  static async createTransactions(transactions) {
    await Repository.createFuturesAssetTransactions(transactions);
  }

  static async futuresFundingRateHistory(assetPair, newFundingRate) {
    const unixTimeToCreated = moment()
      .utc(false)
      .set({ minute: 0, second: 0, millisecond: 0 })
      .unix();
    const timeToCreated = new Localize(new Date(unixTimeToCreated * 1000)).getLocalTime();

    const unixTimeToNextFunding = moment()
      .utc(false)
      .set({ minute: 0, second: 0, millisecond: 0 })
      .add(8, 'h')
      .unix();

    const timeToNextFunding = new Localize(new Date(unixTimeToNextFunding * 1000)).getLocalTime();

    const futuresAssetStatus = await Repository.findFuturesAssetStatus({ asset_pair: assetPair });
    let fundingRate = newFundingRate;
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

    await Repository.createFuturesFundingRate(data);

    return data;
  }

  static async realTimeFundingRate(futuresAssetStatus, newFundingRate) {
    let fundingRate = newFundingRate;
    if (!futuresAssetStatus.is_force_funding_rate) {
      fundingRate = futuresAssetStatus.funding_rate;
    }

    const payloads = {
      assetPair: futuresAssetStatus.asset_pair,
      baseAsset: futuresAssetStatus.base_asset,
      quoteAsset: futuresAssetStatus.quote_asset,
      interval: CONFIG.FUNDING_RATE.INTERVAL,
      timeToNextFunding: futuresAssetStatus.funding_time,
      fundingRate: parseFloat(fundingRate),
      interestRate: futuresAssetStatus.interest_rate,
      currentFundingCap: futuresAssetStatus.current_funding_cap,
      currentFundingFloor: futuresAssetStatus.current_funding_floor,
      defaultFundingCap: futuresAssetStatus.default_funding_cap,
      defaultFundingFloor: futuresAssetStatus.default_funding_floor,
    };

    await Repository.updateFuturesAssetStatus(
      { id: futuresAssetStatus.id },
      { funding_rate: fundingRate },
    );

    SocketBroadCast.futuresFundingRate(payloads);
  }
}

module.exports = Service;
