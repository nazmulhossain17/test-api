const express = require("express");
const {
  createShoe,
  updateShoe,
  getAllShoes,
  deleteShoe,
} = require("../modules/product.controller");
const { isLoggedIn } = require("../middleware/auth-middleware");

const prouter = express.Router();

prouter.get("/test", (req, res) => {
  res.send("p router working");
});

prouter.get("/all-shoes", getAllShoes);
prouter.post("/create-product", isLoggedIn, createShoe);
prouter.put("/update-product/:id", isLoggedIn, updateShoe);
prouter.delete("/shoes/:id", isLoggedIn, deleteShoe);

module.exports = prouter;
