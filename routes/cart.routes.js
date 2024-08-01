const express = require('express');
const { addToCart, getCart, checkoutCart } = require('../modules/carts/cart.controlleer');
const  protect  = require('../middleware/auth');

const router = express.Router();

router.post('/addcart', protect, addToCart);
router.get('/getcart', protect, getCart);
router.post('/checkout', protect, checkoutCart);

module.exports = router;
