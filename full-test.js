const axios = require('axios');
const BASE_URL = 'http://localhost:5000/api';

async function runFullTest() {
  console.log('🚀 Starting Full API Test\n');
  let productId;

  try {
    // 1. CREATE - POST
    console.log('📝 1. Creating a product...');
    const createRes = await axios.post(`${BASE_URL}/products`, {
      name: 'Test Product',
      price: 99.99,
      description: 'Test description',
      category: 'Test Category',
      stock: 10
    });
    productId = createRes.data.data.id;
    console.log(`✅ Created product with ID: ${productId}\n`);

    // 2. GET ALL
    console.log('📋 2. Getting all products...');
    const getAllRes = await axios.get(`${BASE_URL}/products`);
    console.log(`✅ Found ${getAllRes.data.data.length} products\n`);

    // 3. GET BY ID
    console.log(`🔍 3. Getting product with ID ${productId}...`);
    const getOneRes = await axios.get(`${BASE_URL}/products/${productId}`);
    console.log(`✅ Found product: ${getOneRes.data.data.name}\n`);

    // 4. PUT - Full Update
    console.log(`✏️ 4. Updating product ${productId} (PUT)...`);
    const putRes = await axios.put(`${BASE_URL}/products/${productId}`, {
      name: 'Updated Product Name',
      price: 199.99,
      description: 'Updated description',
      category: 'Updated Category',
      stock: 20
    });
    console.log(`✅ Updated: ${putRes.data.data.name}\n`);

    // 5. PATCH - Partial Update
    console.log(`✏️ 5. Partially updating product ${productId} (PATCH)...`);
    const patchRes = await axios.patch(`${BASE_URL}/products/${productId}`, {
      price: 149.99,
      stock: 15
    });
    console.log(`✅ Updated price to: $${patchRes.data.data.price}\n`);

    // 6. GET to verify changes
    console.log(`🔍 6. Verifying changes...`);
    const verifyRes = await axios.get(`${BASE_URL}/products/${productId}`);
    console.log(`✅ Final product:`, verifyRes.data.data);
    console.log(`   Name: ${verifyRes.data.data.name}`);
    console.log(`   Price: $${verifyRes.data.data.price}`);
    console.log(`   Stock: ${verifyRes.data.data.stock}\n`);

    // 7. DELETE
    console.log(`🗑️ 7. Deleting product ${productId}...`);
    await axios.delete(`${BASE_URL}/products/${productId}`);
    console.log(`✅ Product deleted\n`);

    // 8. Verify deletion
    console.log(`🔍 8. Verifying deletion...`);
    try {
      await axios.get(`${BASE_URL}/products/${productId}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(`✅ Product ${productId} no longer exists (as expected)\n`);
      }
    }

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

runFullTest();