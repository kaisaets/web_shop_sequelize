const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require("./util/db");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "web shop app" });
});

app.listen(3002);
