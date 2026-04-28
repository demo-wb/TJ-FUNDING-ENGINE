const Localize = require('engine/localize');

module.exports = (sequelize, DataTypes) => {
  const FuturesPosition = sequelize.define('futures_position', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    position_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    asset_pair: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quote_asset: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    base_asset: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    leverage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weighted_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    avg_buy_entry_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    avg_sell_entry_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    avg_entry_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    avg_close_price: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    current_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    buy_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0,
    },
    sell_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0,
    },
    filled_quantity: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    entry_notional_value: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
    },
    close_notional_value: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    buy_entry_notional_value: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    sell_entry_notional_value: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    side: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    side_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profit: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: false,
      defaultValue: 0,
    },
    take_profit: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    order_take_profit_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_take_profit_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stop_loss: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
    },
    order_stop_loss_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_stop_loss_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    funded_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    opened_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    closed_at: {
      type: DataTypes.DATE,
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

  return FuturesPosition;
};
