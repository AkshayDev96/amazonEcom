const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const category = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique:true,
    required: true
  },
  logo: {
    type: Object,
    required: true
  },
  userid: {
    type: ObjectId,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model("category", category);
