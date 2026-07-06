const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();

//  MIDDLEWARE - MUST BE FIRST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  DEBUG MIDDLEWARE - Shows what's being received
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  console.log('📦 Body:', req.body);
  next();
});

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'product_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'your_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

// Test database connection
sequelize.authenticate()
  .then(() => console.log(' Database connected'))
  .catch(err => {
    console.error('❌ Database error:', err.message);
    console.log('⚠️  Continuing without database...');
  });

// Product Model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: true,
  tableName: 'products'
});

//  TEST ROUTE - Check if body parsing works
app.post('/test', (req, res) => {
  console.log(' Test route received:', req.body);
  res.json({ 
    success: true,
    message: 'Test route works!', 
    receivedBody: req.body 
  });
});

//  POST - Create product (FIXED VERSION)
app.post('/api/products', async (req, res) => {
  console.log('🔄 Creating product...');
  console.log('📦 Received body:', req.body);
  
  try {
    // Check if body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty. Please send JSON data.'
      });
    }

    // Get data from body
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const stock = req.body.stock;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }
    
    if (price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: 'Price is required'
      });
    }
    
    if (stock === undefined || stock === null) {
      return res.status(400).json({
        success: false,
        message: 'Stock is required'
      });
    }
    
    // Create product
    const product = await Product.create({
      name: name,
      price: parseFloat(price),
      description: description || null,
      category: category || null,
      stock: parseInt(stock)
    });
    
    res.status(201).json({ 
      success: true, 
      data: product 
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

//  GET - All products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET - Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ PUT - Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const { name, price, description, category, stock } = req.body;
    await product.update({
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
      category: category || product.category,
      stock: stock !== undefined ? stock : product.stock
    });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ PATCH - Partial update
app.patch('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update(req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ DELETE - Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.destroy();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true })
  .then(() => {
    console.log(' Database synchronized');
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
      console.log(` Test route: POST http://localhost:${PORT}/test`);
      console.log(` Products: POST http://localhost:${PORT}/api/products`);
    });
  })
  .catch(err => {
    console.error('❌ Sync error:', err);
    // Still start server even if DB fails
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT} (without DB)`);
    });
  });