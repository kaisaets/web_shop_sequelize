const { Sequelize } = require('sequelize');
const sequelize = require('../util/db').sequelize;

const Product = sequelize.define(
  'Product',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  },
  {
    tableName: 'products',
  },
);

module.exports = Product;