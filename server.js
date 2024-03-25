const express = require("express");
const mongoose = require("mongoose");
const { PORT } = require("./configs/server.config");
const { DB_URL } = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});

db.once("open", () => {
  console.log("Connected to MongoDB");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });
    if (user) {
      console.log("Admin is already present");
      return;
    } else {
      try {
        user = await user_model.create({
          name: "Zubin",
          userId: "admin",
          email: "znair96@gmail.com",
          userType: "ADMIN",
          password: bcrypt.hashSync("Welcome1", 8),
        });
        console.log("Admin Created");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (err) {
    console.log("Error while reading data", err);
  }
}

require("./routes/auth.route")(app);
require("./routes/category.route")(app);
require("./routes/product.route")(app);
app.listen(PORT, () => {
  console.log("Server Started at ", PORT);
});
