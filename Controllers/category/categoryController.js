const express = require("express");
const UserModel = require("../../Models/category/categoryModel");
const mongoose = require("mongoose");

exports.AddCategory = (req, res) => {
  const { name, logo } = req.body;
  const user = new UserModel({
    name,
    logo
  });
  user
    .save()
    .then(() => {
      return res.status(201).json({
        message: "Saved"
      });
    })
    .catch(e => {
      return res.status(500).json({
        error: e
      });
    });
};
exports.DeleteCategory = (req, res) => {
  const Userid = mongoose.Types.ObjectId(req.params.id);
  UserModel.findByIdAndDelete({ _id: Userid }).then(() => {
    return res
      .status(200)
      .json({
        message: "deleted !!"
      })
      .catch(e => {
        return res.status(500).json({
          error: e
        });
      });
  });
};
exports.GetCategory = (req, res) => {
  UserModel.find({})
    .then(data => {
      return res.status(200).json({ data });
    })
    .catch(e => {
      return res.status(500).json({
        error: e
      });
    });
};
exports.UpdateCategory = (req, res) => {
  const Userid = mongoose.Types.ObjectId(req.params.id);
  const { name, logo } = req.body;
  UserModel.findByIdAndUpdate({ _id: Userid }, { name, logo }).then(() => {
    return res
      .status(200)
      .json({
        message: "updated !!"
      })
      .catch(e => {
        return res.status(400).json({
          error: e
        });
      });
  });
};
