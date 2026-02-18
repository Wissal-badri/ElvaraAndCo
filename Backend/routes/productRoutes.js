const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

const upload = require('../middleware/uploadMiddleware');

// Admin-only routes
router.post('/', [authMiddleware, upload.single('image')], createProduct);
router.put('/:id', [authMiddleware, upload.single('image')], updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
