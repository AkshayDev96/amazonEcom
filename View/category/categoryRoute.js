const express = require("express");
const {
  AddCategory,
  DeleteCategory,
  GetCategory,
  UpdateCategory
} = require("../../Controllers/category/categoryController");
const router = express.Router();

router.post("/user/add", AddCategory);
router.delete("/user/delete/:id", DeleteCategory);
router.get("/user/get", GetCategory);
router.put("/user/update/:id", UpdateCategory);

module.exports = router;
