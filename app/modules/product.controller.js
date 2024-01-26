const prisma = require("../../prisma");

const createShoe = async (req, res) => {
  const {
    name,
    price,
    image,
    quantity,
    brand,
    model,
    style,
    size,
    color,
    material,
    closureType,
  } = req.body;

  try {
    const newShoe = await prisma.shoe.create({
      data: {
        name,
        price,
        image,
        quantity,
        brand,
        model,
        style,
        size,
        color,
        material,
        closureType,
      },
    });

    res
      .status(201)
      .json({ message: "Shoe created successfully", shoe: newShoe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllShoes = async (req, res) => {
  try {
    const allShoes = await prisma.shoe.findMany();
    res.status(200).json({ shoes: allShoes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateShoe = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    image,
    quantity,
    brand,
    model,
    style,
    size,
    color,
    material,
    closureType,
  } = req.body;

  try {
    // Convert the id parameter to an integer
    const shoeId = parseInt(id, 10);

    // Check if the shoe with the given ID exists
    const existingShoe = await prisma.shoe.findUnique({
      where: { id: shoeId },
    });

    if (!existingShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    const updatedShoe = await prisma.shoe.update({
      where: { id: shoeId },
      data: {
        name,
        price,
        image,
        quantity,
        brand,
        model,
        style,
        size,
        color,
        material,
        closureType,
      },
    });

    res
      .status(200)
      .json({ message: "Shoe updated successfully", shoe: updatedShoe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteShoe = async (req, res) => {
  const { id } = req.params;

  try {
    // Convert the id parameter to an integer
    const shoeId = parseInt(id, 10);

    // Check if the shoe with the given ID exists
    const existingShoe = await prisma.shoe.findUnique({
      where: { id: shoeId },
    });

    if (!existingShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    // Delete the shoe
    await prisma.shoe.delete({
      where: { id: shoeId },
    });

    res.status(200).json({ message: "Shoe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createShoe, updateShoe, getAllShoes, deleteShoe };
