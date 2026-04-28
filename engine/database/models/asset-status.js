const Localize = require('engine/localize');

module.exports = (sequelize, DataTypes) => {
  const AssetStatus = sequelize.define('asset_statuses', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    asset: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    asset_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'base_asset',
    },
    base_asset: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'base_asset',
    },
    price_impact_threshold: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 1,
    },
    market_impact_threshold: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 1,
    },
    buy_market_impact_amount: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 1,
    },
    sell_market_impact_amount: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 1,
    },
    fee: {
      type: DataTypes.DOUBLE(12, 6),
      allowNull: false,
      defaultValue: 0.0025,
    },
    withdraw_fee: {
      type: DataTypes.DOUBLE(12, 6),
      allowNull: false,
      defaultValue: 0,
    },
    minimum_buy_in_fiat: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 500,
    },
    minimum_sell_in_fiat: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 500,
    },
    minimum_withdrawal: {
      type: DataTypes.DOUBLE(12, 6),
      allowNull: false,
      defaultValue: 0.001,
    },
    confirmation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    explorer_address_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    explorer_hash_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hot_vault_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hot_wallet_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hot_wallet_memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warm_vault_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warm_wallet_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warm_wallet_memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_memo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sweep_threshold: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    quote_volume_24h: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.0000,
    },
    volume_24h: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.0000,
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    close: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    ask: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_m1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_m1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_m1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_m5: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_m5: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_m5: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_m15: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_m15: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_m15: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_m30: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_m30: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_m30: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_h1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_h1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_h1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_h4: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_h4: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_h4: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_d1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_d1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_d1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_w1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_w1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_w1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    open_mm1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    high_mm1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    low_mm1: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: true,
    },
    is_listed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fee_level_1: {
      type: DataTypes.DOUBLE(10, 6),
      allowNull: true,
    },
    fee_level_2: {
      type: DataTypes.DOUBLE(10, 6),
      allowNull: true,
    },
    fee_level_3: {
      type: DataTypes.DOUBLE(10, 6),
      allowNull: true,
    },
    fee_level_4: {
      type: DataTypes.DOUBLE(10, 6),
      allowNull: true,
    },
    spot_available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    p2p_available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    futures_available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    can_trade: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    can_transfer_in_spot_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_transfer_out_spot_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_transfer_in_p2p_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_transfer_out_p2p_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_transfer_in_futures_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_transfer_out_futures_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_deposit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    can_withdraw: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    image_url: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    price_precision: {
      allowNull: false,
      type: DataTypes.INTEGER,
      default: Number(2),
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

  return AssetStatus;
};
