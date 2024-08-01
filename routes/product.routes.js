const express = require('express');
const { addProduct, getProducts, deleteProduct } = require('../modules/products/product.controller');
const protect  = require('../middleware/auth');
const { isSuperAdmin } = require('../middleware/role');
const upload = require('../middleware/upload'); 

const router = express.Router();

router.post('/addproduct', protect, isSuperAdmin,upload.single('imageURL'), addProduct);
router.get('/getproducts', getProducts);
router.delete('/deleteproduct/:id', protect, isSuperAdmin, deleteProduct);

module.exports = router;
