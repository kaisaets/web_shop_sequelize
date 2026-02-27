const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get('/', (req, res) => shopController.getAllProducts(req, res))
router.get("/cart", (req, res) => shopController.getCart(req, res));
router.post("/cart/add", (req, res) => shopController.addToCart(req, res));

module.exports = router;
