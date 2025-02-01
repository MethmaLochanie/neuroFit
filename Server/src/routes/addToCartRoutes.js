const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/addToCartController');

//public routes
router.post('/addToCart', addToCart);

module.exports = router;