import { Article } from "../schemas/articleModel.js";
import { Comment } from "../schemas/commentModel.js";

// Get comments on an article
export const indexComments = (req, res) => {
  Article.findById(req.params.article_id, (err, article) => {
    if (err) res.send(err);
    else
      res.json({
        message: "Loading comments...",
        data: article.comments,
      });
  });
};

// Add comment to article
export const newComment = (req, res) => {
  const comment = new Comment();
  comment.name = req.body.name;
  comment.email = req.body.email;
  comment.comment = req.body.comment;
  comment.article_id = req.params.article_id;

  if (!comment.name) {
    res.status(400).json({
      message: "'name' is required",
    });
  }
  if (!comment.email) {
    res.status(400).json({
      message: "'email' is required",
    });
  }
  if (!comment.comment) {
    res.status(400).json({
      message: "'comment' is required",
    });
  } else {
    Article.findById(req.params.article_id, (err, article) => {
      if (err) res.send(err);
      article.comments.push(comment);
      article.save((err) => {
        if (err) res.send(err);
        else
          res.json({
            message: "New comment created",
            data: comment,
          });
      });
    });
  }
};

// view comment by ID
export const viewCommentByID = (req, res) => {
  Article.findById(req.params.article_id, (err, article) => {
    const comments = article.comments;
    if (err) res.send(err);
    else
      comments.forEach((comment) => {
        if (comment._id == req.params.comment_id) {
          res.json({
            message: "Loading comment...",
            data: comment,
          });
        }
      });
  });
};

// Delete comment
export const deleteComment = (req, res) => {
  Article.findById(req.params.article_id, (err, article) => {
    const comments = article.comments;
    if (err) res.send(err);
    else
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment._id == req.params.comment_id) {
          comments.splice(i, 1);
        }
      }
    article.save((err) => {
      if (err) res.send(err);
      else
        res.json({
          message: "Comment deleted",
          data: article,
        });
    });
  });
};
