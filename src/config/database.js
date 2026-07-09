require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

sequelize.authenticate()
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.error("Connection Error:", err);
});

module.exports = sequelize;