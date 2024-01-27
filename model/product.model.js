const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      default: Date.now,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    style: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    material: {
      type: String,
    },
    closureType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
