const { models } = require("../models/index");
const User = require("../models/user");
const { sequelize } = require("./db");

const appUser = async (req, res) => {
  try {
    let user = await User.findByPk(1);
    console.log("User", user);

    if (!user) {
      user = await User.create({
        name: "user",
        email: "user@local.com",
      });
    }
    return user;
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};

module.exports = { appUser };
