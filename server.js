require("dotenv").config();

const { app, sequelize } = require("./src/app");

// Import models
require("./src/models/Products");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database Connected Successfully");

        await sequelize.sync();
        console.log("Database Synchronized");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Health: http://localhost:${PORT}/health`);
            console.log(`Products API: http://localhost:${PORT}/api/products`);
        });

    } catch (error) {
        console.error("❌ Database Connection Error:");
        console.error(error);

        process.exit(1);
    }
}

startServer();