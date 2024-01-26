const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../modules/user.controller");
const { isLoggedOut, isLoggedIn } = require("../middleware/auth-middleware");

const router = express.Router();
// router.get("/test", (req, res) => {
//   res.send("Working");
// });
router.post("/create", isLoggedOut, registerUser);
router.post("/login", isLoggedOut, loginUser);
router.get("/log-out", isLoggedIn, logoutUser);

module.exports = router;
