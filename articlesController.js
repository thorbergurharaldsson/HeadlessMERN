import { Article } from "./articleModel.js";

// handel index actions
export const indexArticles = (req, res) => {
  Article.get((err, articles) => {
    if (err) {
      res.json({
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

export const newArticle = (req, res) => {
  const article = new Article();
  article.title = req.body.title;
  article.content = req.body.content;
  article.author = req.body.author;

  if (!article.title) {
    res.status(400).json({
      message: "'title' is required",
    });
  }
  if (!article.content) {
    res.status(400).json({
      message: "'content' is required",
    });
  }
  if (!article.author) {
    res.status(400).json({
      message: "'author' is required",
    });
  } else {
    // save the article and check for errors
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
