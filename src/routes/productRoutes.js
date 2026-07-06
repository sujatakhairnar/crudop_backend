const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// POST route
router.post('/', productController.createProduct);

// PUT route
router.put('/:id', productController.updateProduct);

// PATCH route
router.patch('/:id', productController.patchProduct);

// DELETE route
router.delete('/:id', productController.deleteProduct);

module.exports = router;