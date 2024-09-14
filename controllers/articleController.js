const Article = require("../models/articleSchema");

exports.CreateArticle = async (req, res) => {
  const { title, content, category, tags, status } = req.body;

  const article = new Article({
    title,
    content,
    category,
    tags,
    status: status || "Draft",
  });

  await article.save();

  res.status(201).send(article);
};
// getall
exports.getArticle = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  let query = category ? { category } : {};

  const articles = await Article.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const total = await Article.countDocuments(query);

  res.json({ articles, total });
};
// get
exports.getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate("comments");
  if (!article) {
    return res.status(404).send("Article not found");
  }
  res.send(article);
};

// update
exports.updateArticle = async (req, res) => {
  try {
    const { title, content, category, tags, status } = req.body;
    const articleId = req.params.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    if (article.status !== "Draft") {
      return res.status(400).send("Cannot update a draft article");
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        title,
        content,
        category,
        tags,
        status: status || "Draft",
      },
      { new: true }
    );

    await updatedArticle.save();
    res.send(updatedArticle);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// delete
exports.deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return res.status(404).send("Article not found");
  }
  res.send(article);
};

// like

exports.likeArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    if (article.status !== "Published") {
      return res.status(403).send("Cannot like a draft article");
    }

    article.likes += 1;

    const updatedArticle = await article.save();
    res.send(updatedArticle);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
