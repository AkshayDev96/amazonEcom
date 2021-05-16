const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Amazoncategory = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  userid: {
    type: ObjectId,
    required: true
  }
});
module.exports = mongoose.model("category", Amazoncategory);
