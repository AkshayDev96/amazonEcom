const express = require("express");
const UserModel = require("../Models/AmazonProduct");
const mongoose = require("mongoose");

exports.AddProduct = (req, res) => {
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
      return res.status(400).json({
        error: e
      });
    });
};
exports.DeleteProduct = (req, res) => {
  const Userid = mongoose.Types.ObjectId(req.params.id);
  UserModel.findByIdAndDelete({ _id: Userid }).then(() => {
    return res
      .status(200)
      .json({
        message: "deleted !!"
      })
      .catch(e => {
        return res.status(400).json({
          error: e
        });
      });
  });
};
exports.GetProduct = (req, res) => {
  UserModel.find({})
    .then(data => {
      return res.status(200).json({ data });
    })
    .catch(e => {
      return res.status(400).json({
        error: e
      });
    });
};
exports.UpdateProduct = (req, res) => {
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
