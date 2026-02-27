const Product = require("../../models/product");
const { getAllProducts, getProductById } = require("../product");

const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      userId: req.user.id,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the product." });
  }
};

const editProduct = async (req, res) => {
  try {
    if (!req.query.edit) {
      return res.status(400).json({
        error: "Edit query parameter is required for editing a product.",
      });
    } else if (req.query.edit !== "true") {
      return res.status(400).json({
        error:
          "Edit query parameter must be set to true for editing a product.",
      });
    } else {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        product.title = req.body.title || product.title;
        product.price = req.body.price || product.price;
        product.imageUrl = req.body.imageUrl || product.imageUrl;
        product.description = req.body.description || product.description;
        await product.save();
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found." });
      }
    }
  } catch (error) {
    console.error("Error editing product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while editing the product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.query.delete) {
      return res.status(400).json({
        error: "Delete query parameter is required for deleting a product.",
      });
    } else if (req.query.delete !== "true") {
      return res.status(400).json({
        error:
          "Delete query parameter must be set to true for deleting a product.",
      });
    } else {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully." });
      } else {
        res.status(404).json({ error: "Product not found." });
      }
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product." });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
