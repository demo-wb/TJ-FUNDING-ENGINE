const Localize = require('engine/localize');

module.exports = (sequelize, DataTypes) => {
  const fundingRate = sequelize.define('futures_funding_rate', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    asset_pair: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
    base_asset: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quote_asset: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interval: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_to_next_funding: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    funding_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    interest_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    current_funding_cap: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    current_funding_floor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    default_funding_cap: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    default_funding_floor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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

  return fundingRate;
};
