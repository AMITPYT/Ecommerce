const express = require('express');
const { addProduct, getProducts, deleteProduct, updateProduct } = require('../modules/products/product.controller');
const protect  = require('../middleware/auth');
const { isSuperAdmin } = require('../middleware/role');
const upload = require('../middleware/upload'); 

const router = express.Router();

router.post('/addproduct', protect, isSuperAdmin,upload.single('image'), addProduct);
router.get('/getproducts', getProducts);
router.delete('/deleteproduct/:id', protect, isSuperAdmin, deleteProduct);
router.put('/updateproduct/:id', protect, isSuperAdmin,upload.single('image'), updateProduct);

module.exports = router;
