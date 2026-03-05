const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const CartItem = require("../models/cart-item");
const product = require("./product");
const Cart = require("../models/cart");
const Product = require("../models/product")

class orderController {
  async placeOrder(req, res) {
    try {
      const userCart = await req.user.getCart();

      if (!userCart) {
        return res.status(404).json({ error: "User does not have a cart" });
      }

      const cartProducts = await userCart.getProducts();

      if (cartProducts.length === 0) {
        return res.status(404).json({ error: "Empty cart" });
      }

      const totalPrice = cartProducts.reduce((sum, product) => {
        return sum + product.price * product.CartItem.quantity;
      }, 0);

      //new order
      const order = await req.user.createOrder({
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      });

      await Promise.all(
        cartProducts.map((product) =>
          order.addProduct(product, {
            through: {
              quantity: product.CartItem.quantity,
              price: product.price,
            },
          }),
        ),
      );
      //empty cart
      await CartItem.destroy({
        where: { cartId: userCart.id },
      });

      const createdOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: Product,
            through: { attributes: ["quantity", "price"] },
          },
        ],
      });

      res.status(201).json({
        message: "Order placed successfully.",
        order: createdOrder,
      });
    } catch (error) {
      console.error("Error while placing an order: ", error);
      res.status(500).json({ error: "Error while placing an order." });
    }
  }
  //GET user orders
  async getOrders(req, res) {
    try {
      const orders = await req.user.getOrders({
        include: [
          {
            model: Product,
            through: { attributes: ["quantity", "price"] },
            //through: OrderItem
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error while retrieving orders", error);
      res.status(500).json({ error: "Error while loading orders." });
    }
  }
}

module.exports = new orderController();
