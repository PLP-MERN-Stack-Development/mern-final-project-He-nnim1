const express = require('express');
const router = express.Router();
const {getProducts, getProductById, updateProduct, deleteProduct, createProduct} = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected (farmer)
router.post(
    '/', 
    protect, 
    restrictTo('farmer'),
    upload.single('image'),
    createProduct);
router.put('/:id', protect, restrictTo('farmer'), updateProduct);
router.delete('/:id', protect, restrictTo('farmer'), deleteProduct);

module.exports = router;
