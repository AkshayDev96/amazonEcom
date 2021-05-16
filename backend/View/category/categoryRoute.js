const express = require("express");
const {
  AddCategory,
  DeleteCategory,
  GetCategory,
  UpdateCategory
} = require("../../Controller/category/categoryController");
const router = express.Router();
const adminAuth = require('../../Middleware/admin/admin')

//admin add category
router.post("/admin/category/add",adminAuth,AddCategory);
//admin delete category
router.delete("/admin/category/delete/:id",adminAuth, DeleteCategory);
//admin get category
router.get("/admin/categories/get",adminAuth, GetCategory);
//admin update category
router.put("/admin/category/update/:id",adminAuth, UpdateCategory);

module.exports = router;
