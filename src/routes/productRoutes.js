const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// Create a new product
router.post("/", productController.createProduct);

// Update entire product
router.put("/:id", productController.updateProduct);

// Update specific fields
router.patch("/:id", productController.patchProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;