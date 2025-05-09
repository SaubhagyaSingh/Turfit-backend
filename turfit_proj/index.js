require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
app.get("/hello", (req, res) => {
  res.send("Hello world");
});
const DB = process.env.DB;
mongoose.connect(DB).then(() => {
  console.log("mongodb connected");
});

//middleware- to register routes
app.use(express.json());
app.use(authRouter);

app.listen(PORT, "0.0.0.0", function () {
  console.log(`server is running on ${PORT} ...`);
});
//testing