const { Sequelize } = require("sequelize");
const sequelize = require("../util/db").sequelize;

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    totalPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
  },
  {
    tableName: "orders",
  },
);
module.exports = Order;