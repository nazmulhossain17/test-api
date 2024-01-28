const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./app/routes/user.route");
const productRouter = require("./app/routes/product.route");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://shoe-inventory-5714f.web.app/",
    credentials: true,
  })
);
app.use("/api/v1", userRouter);
app.use("/api/v2", productRouter);

app.get("/", (req, res) => {
  res.send("Working now");
});

app.use((err, req, res, next) => {
  console.error("Error caught:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
