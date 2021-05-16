const mongoose = require("mongoose");

const AmazonProduct = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  logo: {
    type: String,
    require: true
  }
});
module.exports = mongoose.model("user", AmazonProduct);
