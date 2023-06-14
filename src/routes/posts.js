const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/checkAuth");

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

router.get("/", checkAuth, getAllPosts);
router.get("/:id", checkAuth, getPost);
router.post("/", checkAuth, createPost);
router.put("/:id", checkAuth, updatePost);
router.delete("/:id", checkAuth, deletePost);

module.exports = router;
