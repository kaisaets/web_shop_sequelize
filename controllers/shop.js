const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

class shopController {
  async getAllProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.status(201).json({ products: products });
    } catch (error){
        console.log('Shop products error', error)
        res.status(500).json({ error: error });
    }
  }

  async getCart(req, res) {
    console.log(req.user)
    try {
        console.log(req.user)
        //const userCart = await req.user.getCart();
        //console.log(userCart)
        //const cartProducts = await userCart.getProducts();
        //console.log('Products on cart', cartProducts);
        res.status(201).json({
        message: 'test',
        });
    } catch (error) {
        console.log('Shop products error', error)
        res.status(500).json({ error: error });
    }
  }

  async addToCart(req, res) {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    try {
      const cart = await req.user.getCart();
      fetchedCart = CartItem;
      const products= await cart.getProducts({ where: { id: prodId } });
      let product

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        await fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        });
      } else {
        const productToAdd = await Product.findByPk(prodId);
        await fetchedCart.addProduct(productToAdd, {
          through: { quantity: newQuantity },
        });
      }
      res.status(201).json({ message: "Added to cart!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new shopController();
