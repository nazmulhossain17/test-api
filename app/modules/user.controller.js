const prisma = require("../../prisma");
const { jwtKey } = require("../helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, jwtKey, {
    expiresIn: "1h",
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateAccessToken(user.id);

    res.cookie("token", token, { httpOnly: true });

    res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
