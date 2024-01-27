const express = require("express");

const { isLoggedIn } = require("../middleware/auth-middleware");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../modules/product.controller");

const prouter = express.Router();

prouter.get("/test", (req, res) => {
  res.send("p router working");
});

prouter.get("/all-shoes", getAllProducts);
prouter.get("/all-shoes/:productId", getProductById);
prouter.post("/create-product", createProduct);
prouter.put("/update-product/:productId", isLoggedIn, updateProduct);
prouter.delete("/shoes/:productId", isLoggedIn, deleteProduct);

module.exports = prouter;
