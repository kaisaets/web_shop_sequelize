const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.get("/products", (req, res) =>
  productController.getAllProducts(req, res),
);
router.get("/:productId", productController.getProductById);

module.exports = router;
