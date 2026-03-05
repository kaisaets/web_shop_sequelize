const express = require("express");
const { sequelize } = require("./util/db");
//const { User, Product, Cart, CartItem } = require("./models/index");
const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const { appUser } = require("./util/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(async (req, res, next) => {
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
//const productRoutes = require("./routes/products");

app.use("/admin/", adminProductRoutes);
//app.use("/", productRoutes);

// 1. User <-> Product
User.hasMany(Product, {
  foreignKey: "userId",
  as: "products",
});
Product.belongsTo(User, {
  foreignKey: "userId",
  constraints: true,
  onDelete: "CASCADE",
});

// 2. User <-> Cart
User.hasOne(Cart, {
  foreignKey: "userId",
});
Cart.belongsTo(User, {
  foreignKey: "userId",
});

// 3. Cart <-> Product
Cart.belongsToMany(Product, {
  through: CartItem,
  foreignKey: "cartId",
  otherKey: "productId",
});
Product.belongsToMany(Cart, {
  through: CartItem,
  foreignKey: "productId",
  otherKey: "cartId",
});

//console.log(Cart.associations.Products.accessors)
//console.log(Product.associations.Carts.accessors)

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "user", email: "user@local.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    //console.log(cart);
    app.listen(3002);
  })
  .catch(err => {
     console.error("DB sync error:", err);
  });