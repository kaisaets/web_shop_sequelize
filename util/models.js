const { models } = require("../models/index");
const Product = require("../models/product");
const User = require("../models/user");
const { sequelize, dbSync } = require("./db");

sequelize.models = models;


dbSync();
