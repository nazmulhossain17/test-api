require("dotenv").config();
const jwtKey = process.env.JWT_KEY;
const dbURL = process.env.DATABASE_URL;

module.exports = { jwtKey, dbURL };
