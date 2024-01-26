const jwt = require("jsonwebtoken");
const { jwtKey } = require("../helper");

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Missing token",
      });
    }

    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Please Login",
      });
    }

    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      return res.status(404).json({
        success: false,
        message: "User is already logged in",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { requireSignIn, isLoggedIn, isLoggedOut };
