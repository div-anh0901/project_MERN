require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookiePerser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(cookiePerser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Conntect to mongoose
const URI = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth_jwt_mern");
    console.log("Connected to mongodb");
  } catch (e) {
    console.log(e);
  }
};
connectDB();

app.use("/user", require("./router/userRouter"));
app.use("/api", require("./router/upload"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port 5000!`));
