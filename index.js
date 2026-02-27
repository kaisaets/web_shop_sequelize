const express = require("express");
const sequelize = require("./util/db");
const models = require("./models/index");
const { appUser } = require("./util/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, resizeBy, next) => {
  try {
    const user = await appUser();
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the user" });
  }
});

const adminProductRoutes = require("./routes/admin/products");
const productRoutes = require("./routes/products");

app.use("/admin/", adminProductRoutes);
app.use("/", productRoutes);

app.listen(3027, () => {
  console.log(`Server is running on port 3027`);
});
