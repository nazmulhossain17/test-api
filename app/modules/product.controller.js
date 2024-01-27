const Shoe = require("../../model/product.model");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      image,
      brand,
      description,
      model,
      style,
      size,
      color,
      material,
      closureType,
    } = req.body;

    // Create a new shoe instance
    const newShoe = new Shoe({
      name,
      price,
      quantity,
      image,
      brand,
      description,
      model,
      style,
      size,
      color,
      material,
      closureType,
    });

    // Save the shoe to the database
    const savedShoe = await newShoe.save();

    res.status(201).json(savedShoe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Shoe.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is passed as a route parameter

    // Fetch the product from the database by ID
    const product = await Shoe.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is passed as a route parameter
    const updateData = req.body;

    // Check if the product exists in the database
    const product = await Shoe.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product information
    for (const [key, value] of Object.entries(updateData)) {
      product[key] = value;
    }

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is passed as a route parameter

    // Use findByIdAndDelete to remove the product directly from the database
    const deletedProduct = await Shoe.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
