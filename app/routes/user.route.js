const express = require("express");

const { isLoggedOut } = require("../middleware/auth-middleware");
const {
  createUser,
  loginController,
  updateUser,
  logoutController,
} = require("../modules/user.controller");

const router = express.Router();
// router.get("/test", (req, res) => {
//   res.send("Working");
// });
router.post("/create", isLoggedOut, createUser);
router.post("/login", isLoggedOut, loginController);
router.put("/update/:userId", updateUser);
router.get("/log-out", logoutController);

module.exports = router;
