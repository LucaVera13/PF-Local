const express = require('express');
const router = express.Router();
const {
  addToCartHandler,
  removeFromCartHandler,
  getCartProductsHandler,
} = require('../Controllers/carrito');

router.post('/', addToCartHandler);
router.delete('/', removeFromCartHandler);
router.get('/', getCartProductsHandler);

module.exports = router;
