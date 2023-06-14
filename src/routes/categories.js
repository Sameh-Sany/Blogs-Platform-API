const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/checkAuth");
const { checkAdmin } = require("../middlewares/checkAdmin");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

router.get("/", checkAuth, getAllCategories);
router.get("/:id", checkAuth, getCategory);
router.post("/", checkAuth, checkAdmin, createCategory);
router.put("/:id", checkAuth, checkAdmin, updateCategory);
router.delete("/:id", checkAuth, checkAdmin, deleteCategory);

module.exports = router;
