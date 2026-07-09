require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false, // Disable SQL query logs
});

// Test Database Connection
sequelize
    .authenticate()
    .then(() => {
        console.log("✅ Database Connected Successfully");
    })
    .catch((err) => {
        console.error("❌ Database Connection Error:", err.message);
    });

module.exports = sequelize;