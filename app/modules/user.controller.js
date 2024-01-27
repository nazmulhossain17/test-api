const User = require("../../model/user.model");
const { jwtKey } = require("../helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      image,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ user }, jwtKey, { expiresIn: "1h" });

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // maxAge is in milliseconds (1 hour in this example)

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed as a route parameter
    const { name, email, password, image } = req.body;

    // Check if the user exists in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user information
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      // If a new password is provided, hash and update it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.image = image || user.image;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutController = (req, res) => {
  try {
    res.clearCookie("token"); // Clear the 'token' cookie

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, loginController, updateUser, logoutController };
