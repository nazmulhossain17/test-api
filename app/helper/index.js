require("dotenv").config();
const jwtKey = process.env.JWT_KEY;

module.exports = { jwtKey };
