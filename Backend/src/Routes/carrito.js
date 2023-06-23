const express = require("express");
const router = express.Router();
const {
  addToCartHandler,
  removeFromCartHandler,
  getCartProductsHandler,
} = require("../Controllers/carrito");

router.put("/add", addToCartHandler);
router.put("/remove", removeFromCartHandler);
router.get("/", getCartProductsHandler);

module.exports = router;
