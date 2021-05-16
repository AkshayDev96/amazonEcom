const express = require("express");
const {
  AddProduct,
  DeleteProduct,
  GetProduct,
  UpdateProduct
} = require("../Controllers/AmozonProduct_Controller");
const router = express.Router();

router.post("/api/user/add", AddProduct);
router.delete("/api/user/delete/:id", DeleteProduct);
router.get("/api/user/get", GetProduct);
router.put("/api/user/update/:id", UpdateProduct);

module.exports = router;
