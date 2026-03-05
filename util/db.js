const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(
  `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
  }
};

const dbSync = async (force = false) => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully!");
  } catch (err) {
    console.error("Unable to synchronize the database:", err.message);
  }
};

module.exports = {
  sequelize,
  Sequelize,
  connect,
  dbSync,
};
