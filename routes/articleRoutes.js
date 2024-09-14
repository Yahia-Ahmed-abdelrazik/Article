const express = require("express");

const {
  CreateArticle,
  getArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  likeArticle,
} = require("../controllers/articleController");

const router = express.Router();

router.post("/create", CreateArticle);
router.get("/", getArticle);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.put("/:id/like", likeArticle);

module.exports = router;
