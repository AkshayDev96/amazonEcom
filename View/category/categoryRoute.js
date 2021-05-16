const express = require("express");
const {
  AddCategory,
  DeleteCategory,
  GetCategory,
  UpdateCategory
} = require("../../Controllers/category/categoryController");
const router = express.Router();

router.post("/api/user/add", AddCategory);
router.delete("/api/user/delete/:id", DeleteCategory);
router.get("/api/user/get", GetCategory);
router.put("/api/user/update/:id", UpdateCategory);

module.exports = router;
