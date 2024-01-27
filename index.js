const mongoose = require("mongoose");
const app = require("./app");
const { dbURL } = require("./app/helper");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Working");
});

async function connectDB() {
  try {
    await mongoose.connect(dbURL);
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
}

connectDB();
