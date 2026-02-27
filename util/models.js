const { models } = require("../models/index");
const Product = require("../models/product");
const User = require("../models/user");
const { sequelize, dbSync } = require("./db");

sequelize.models = models;

models.User.hasMany(models.Product, { foreignKey: "userId", as: "products" });
models.Product.belongsTo(
  models.User,
  { foreignKey: "userId", as: "user" },
  {
    constrains: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
);

dbSync();
