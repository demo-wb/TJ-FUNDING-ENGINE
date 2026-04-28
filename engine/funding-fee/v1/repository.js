const {
  asset_statuses: AssetStatuses,
  futures_position: FuturesPosition,
  futures_asset_status: FuturesAssetStatus,
  futures_asset_transaction: FuturesAssetTransaction,
  futures_time_summary_trade: FuturesTimeSummaryTrade,
  futures_funding_rate: FuturesFundingRate,
} = require('engine/database/models');

class Repository {
  static async updateFuturesAssetStatus(filter, data) {
    await FuturesAssetStatus.update(
      data,
      {
        where: filter,
      },
    );
  }

  static async findFuturesPositions(filter) {
    const futuresPosition = await FuturesPosition.findAll({
      where: filter,
    });

    return futuresPosition;
  }

  static async findFuturesTimeSummaryTrade(filter) {
    const futuresTimeSummaryTrade = await FuturesTimeSummaryTrade.findOne({
      where: filter,
      order: [
        ['start_date', 'DESC'],
      ],
    });

    return futuresTimeSummaryTrade;
  }

  static async findAssetStatus(filter) {
    const assetStatus = await AssetStatuses.findOne({ where: filter });

    return assetStatus;
  }

  static async createFuturesAssetTransactions(data) {
    const futuresAssetStatuses = await FuturesAssetTransaction.bulkCreate(data);

    return futuresAssetStatuses;
  }

  static async createFuturesFundingRate(data) {
    const futuresFundingRate = await FuturesFundingRate.create(data);

    return futuresFundingRate;
  }

  static async findFuturesAssetStatus(filter) {
    const futuresAssetStatus = await FuturesAssetStatus.findOne({
      where: filter,
    });

    return futuresAssetStatus;
  }
}

module.exports = Repository;
