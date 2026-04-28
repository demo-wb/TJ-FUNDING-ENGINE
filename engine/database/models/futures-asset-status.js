const Localize = require('engine/localize');

module.exports = (sequelize, DataTypes) => {
  const FuturesAssetStatus = sequelize.define('futures_asset_status', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    asset_pair: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    base_asset: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quote_asset: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    base_asset_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price_precision: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
    },
    quantity_precision: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
    },
    quote_asset_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    asset_pair_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    base_asset_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quote_asset_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_listed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    maker_fee_level_1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    taker_fee_level_1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    maker_fee_level_2: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    taker_fee_level_2: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    maker_fee_level_3: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    taker_fee_level_3: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    maker_fee_level_4: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    taker_fee_level_4: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    spread: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0,
    },
    digit: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 0,
    },
    margin_constant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    pip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    min_trade_amount: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 0.001,
    },
    min_notional_value: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 5,
    },
    min_order_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 0.01,
    },
    min_price_movement: {
      type: DataTypes.DOUBLE(12, 8),
      allowNull: true,
      defaultValue: 0.1,
    },
    limit_order_price_cap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    floor_ratio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    max_open_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 200,
    },
    price_protection_threshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    liquidation_clearance_fee: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 1.25,
    },
    market_order_price_cap_ratio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    open_position_notional_value_contract: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ratio_the_total_positions_of_contract: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    liquidation_price_and_mark_price_gap: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    market_max_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 10,
    },
    market_min_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0.01,
    },
    limit_max_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 10,
    },
    limit_min_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0.01,
    },
    taker_commission_fee: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0.0004,
    },
    maker_commission_fee: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0.0002,
    },
    mark_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    bid: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0,
    },
    ask: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0,
    },
    index_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    max_orders: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_mask: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    mask_mark_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    mask_bid: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    mask_ask: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    mask_tick: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mask_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    close: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    open_m1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_m1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_m1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_m5: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_m5: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_m5: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_m15: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_m15: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_m15: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_m30: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_m30: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_m30: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_h1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_h1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_h1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_h4: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_h4: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_h4: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_d1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_d1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_d1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_w1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_w1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_w1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    open_mm1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    high_mm1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    low_mm1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_m1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_m5: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_m15: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_m30: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_h1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_h4: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_d1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_w1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    volume_mm1: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    quote_volume_24h: {
      type: DataTypes.DOUBLE(20, 4),
      allowNull: false,
      defaultValue: 0,
    },
    base_volume_24h: {
      type: DataTypes.DOUBLE(20, 4),
      allowNull: false,
      defaultValue: 0,
    },
    funding_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_force_funding_rate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    funding_rate: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 0,
    },
    current_funding_cap: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    current_funding_floor: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    default_funding_cap: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    default_funding_floor: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    interest_rate: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    can_trade: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    max_leverage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    leverage_last_updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    business_key: {
      type: DataTypes.STRING(10),
      allowNull: true,
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

  return FuturesAssetStatus;
};
