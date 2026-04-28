const Localize = require('engine/localize');

module.exports = (sequelize, DataTypes) => {
  const FuturesAssetTransaction = sequelize.define('futures_asset_transaction', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    tx_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tx_type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ref_transfer_transaction_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    ref_spot_asset_transaction_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    ref_p2p_asset_transaction_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    ref_futures_asset_transaction_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    ref_futures_orders_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    ref_futures_positions_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    asset_pair: {
      allowNull: true,
      type: DataTypes.STRING(10),
    },
    base_asset: {
      allowNull: true,
      type: DataTypes.STRING(10),
    },
    quote_asset: {
      allowNull: true,
      type: DataTypes.STRING(10),
    },
    asset: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    asset_status_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    futures_asset_status_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    fee: {
      allowNull: true,
      type: DataTypes.DOUBLE(17, 8),
    },
    fee_amount: {
      allowNull: true,
      type: DataTypes.DOUBLE(17, 8),
    },
    amount_before_deduct_fee: {
      allowNull: true,
      type: DataTypes.DOUBLE(17, 8),
    },
    before_amount: {
      allowNull: true,
      type: DataTypes.DOUBLE(17, 8),
    },
    amount: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    after_amount: {
      allowNull: true,
      type: DataTypes.DOUBLE(17, 8),
    },
    created_microseconds: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    is_calculate_balance: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
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

  return FuturesAssetTransaction;
};
