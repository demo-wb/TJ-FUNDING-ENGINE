const Localize = require('engine/localize/index');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    btc_balance: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
      defaultValue: 0,
    },
    usdt_balance: {
      type: DataTypes.DOUBLE(17, 8),
      allowNull: true,
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

  return User;
};
