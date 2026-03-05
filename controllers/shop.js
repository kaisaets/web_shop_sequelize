const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

class shopController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(201).json({ products: products });
    } catch (error) {
      console.log("Shop products error", error);
      res.status(500).json({ error: error });
    }
  }

  async getCart(req, res) {
    console.log(req.user);
    try {
      console.log(req.user);
      const userCart = await req.user.getCart();
      console.log(userCart);
      const cartProducts = await userCart.getProducts();
      console.log("Products on cart", cartProducts);
      cartProducts.forEach((product) => {
        console.log(product.CartItem);
      });
      res.status(201).json({
        cart: cartProducts,
      });
    } catch (error) {
      console.log("Shop products error", error);
      res.status(500).json({ error: error });
    }
  }

  async addToCart(req, res) {
    try {
      const productId = parseInt(req.body.productId);
      const userCart = await req.user.getCart();
      if (!userCart) {
        return res.status(404).json({ error: "Cart not found for the user." });
      }
      const products = await userCart.getProducts();
      if (products.length == 0) {
        const product = await Product.findByPk(productId);
        await userCart.addProduct(product, { through: { quantity: 1 } });
      } else {
        if (await userCart.hasProduct(productId)) {
          const cartItem = await CartItem.findOne({
            where: {
              cartId: userCart.id,
              productId: productId,
            },
          });
          cartItem.quantity += 1;
          await cartItem.save();
        } else {
          const product = await Product.findByPk(productId);
          await userCart.addProduct(product, { through: { quantity: 1 } });
        }
      }
      res.status(200).json({ message: "Product added to cart successfully." });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({
        error: "An error occurred while adding the product to the cart.",
      });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const productId = parseInt(req.body.productId);
      const userCart = await req.user.getCart();
      if (!userCart) {
        return res.status(404).json({ error: "User does not have a cart" });
      }
      const products = await userCart.getProducts();
      if (products.length == 0) {
        return res.status(404).json({ error: "No products in cart" });
      } else {
        if (await userCart.hasProduct(productId)) {
          const cartItem = await CartItem.findOne({
            where: {
              cartId: userCart.id,
              productId: productId,
            },
          });
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
          } else {
            await cartItem.save();
          }
        } else {
          return res.status(404).json({ error: "Product not found in cart" });
        }
      }
      res
        .status(200)
        .json({ message: "Product removed from cart successfully." });
    } catch (error) {
      console.error("Error removing product from cart: ", error);
      res
        .status(500)
        .json({
          error: "An error occurred while removing the product from the cart.",
        });
    }
  }
}

module.exports = new shopController();
