const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("get the request");
});
app.use(require("./View/AmazoneProduct_Route"));
mongoose.connect(process.env.mngo_conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

mongoose.connection.on("error", err => {
  console.log("Connection Error", err);
});

app.listen(process.env.PORT, () => {
  console.log("listening the port");
});
