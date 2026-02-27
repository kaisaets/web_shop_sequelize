const { Sequelize } = require("sequelize");
const sequelize = require("../util/db").sequelize;

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    quantity: Sequelize.INTEGER,
  },
  {
    tableName: "cartItems",
  },
);
module.exports = CartItem;
