const Localize = require('engine/localize');

module.exports = (sequelize, DataTypes) => {
  const FuturesTimeSummaryTrade = sequelize.define('futures_time_summary_trade', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    asset_pair: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    time_key: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    frame: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    close: {
      allowNull: true,
      type: DataTypes.DOUBLE(12, 2),
    },
    open: {
      allowNull: true,
      type: DataTypes.DOUBLE(12, 2),
    },
    high: {
      allowNull: true,
      type: DataTypes.DOUBLE(12, 2),
    },
    low: {
      allowNull: true,
      type: DataTypes.DOUBLE(12, 2),
    },
    volume: {
      allowNull: false,
      type: DataTypes.DOUBLE(12, 2),
      defaultValue: 0,
    },
    quote_volume: {
      allowNull: false,
      type: DataTypes.DOUBLE(12, 2),
      defaultValue: 0,
    },
    trade: {
      allowNull: false,
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: () => new Localize().getLocalTime(),
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: () => new Localize().getLocalTime(),
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return FuturesTimeSummaryTrade;
};
