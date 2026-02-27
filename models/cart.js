const { Sequelize } = require("sequelize");
const sequelize = require("../util/db").sequelize;

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "carts",
  },
);
module.exports = Cart;
