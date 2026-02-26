const Product = require("../../models/product");

class adminController {
  async addProduct(req, res) {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });
    res.status(201).json({
      message: "Product is added",
      productId: product.id,
    });
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProductById(req, res) {
    const productId = req.params.productId;
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateProductById(req, res) {
    const productId = req.params.productId;
    const { title, price, imageUrl, description } = req.body;

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product with this id not found" });
      }
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      await product.save();
      res.status(200).json({ message: "Product updated: ", product: product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteProductById(req, res) {
    const productId = req.params.productId;

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product with this id not found" });
      }
      await product.destroy();
      res.status(200).json({ message: "Deleted product: ", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new adminController();
