import { Article } from "../schemas/articleModel.js";

// handel index actions
export const indexArticles = (req, res) => {
  Article.get((err, articles) => {
    if (err) {
      return res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Articles retrieved successfully",
      data: articles,
      content: Article.get,
    });
  });
};

// Create new article
export const newArticle = (req, res) => {
  const article = new Article();
  article.title = req.body.title;
  article.subtitle = req.body.subtitle;
  article.content = req.body.content;
  article.author = req.body.author;
  article.authorName = req.body.authorName;
  article.published = req.body.published;
  article.updated_at = new Date().toISOString();

  if (!article.title) {
    return res.status(400).json({
      message: "'title' is required",
    });
  }
  if (!article.content) {
    return res.status(400).json({
      message: "'content' is required",
    });
  }
  if (!article.author) {
    return res.status(400).json({
      message: "'author' is required",
    });
  } else {
    article.save((err) => {
      // Check for validation error
      if (err) res.json(err);
      else
        res.json({
          message: "New article created!",
          data: article,
        });
    });
  }
};

// get a single article by ID
export const viewArticleByID = (req, res) => {
  Article.findById(req.params.article_id, (err, article) => {
    if (err) return res.send(err);

    res.json({
      message: "Article details loading...",
      data: article,
    });
  });
};

// Handle update article info
export const updateArticle = (req, res) => {
  Article.findById(req.params.article_id, (err, article) => {
    if (err) return res.send(err);
    article.title = req.body.title ? req.body.title : article.title;
    article.subtitle = req.body.subtitle ? req.body.subtitle : article.subtitle;
    article.content = req.body.content ? req.body.content : article.content;
    article.author = req.body.author ? req.body.author : article.author;
    article.authorName = req.body.authorName
      ? req.body.authorName
      : article.authorName;
    article.published =
      req.body.published !== undefined ? req.body.published : article.published;
    article.updated_at = new Date().toISOString();

    article.save((err) => {
      if (err) res.json(err);
      res.json({
        message: "Article Info updated",
        data: article,
      });
    });
  });
};

// Delete article
export const deleteArticle = (req, res) => {
  Article.deleteOne(
    {
      _id: req.params.article_id,
    },
    (err) => {
      if (err) return res.send(err);
      res.json({
        status: "success",
        message: "Article deleted",
      });
    }
  );
};
