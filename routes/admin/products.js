const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product");

router.post("/product/add", (req, res) =>
  productController.addProduct(req, res),
);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.editProduct);
router.delete("/:productId", productController.deleteProduct)

module.exports = router;
