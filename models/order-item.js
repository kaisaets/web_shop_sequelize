const { Sequelize } = require("sequelize");
const sequelize = require("../util/db").sequelize;

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "orderItems",
  },
);
module.exports = OrderItem;
