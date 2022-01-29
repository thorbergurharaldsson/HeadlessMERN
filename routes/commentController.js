import { Comment } from "../schemas/commentModel.js";

// get comments by articleID
export const viewCommentByArticleID = (req, res) => {
  Comment.find({ article_id: req.params.article_id }, (err, comment) => {
    if (err) res.send(err);

    res.json({
      message: "Comments loading...",
      data: comment,
    });
  });
};

// Create a comment on an arcticle
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
  }
  if (!comment.article_id) {
    res.status(400).json({
      message: "'article_id' is required",
    });
  } else {
    // save the comment and check for errors
    comment.save((err) => {
      // Check for validation error
      if (err) res.json(err);
      else
        res.json({
          message: "New comment created!",
          data: comment,
        });
    });
  }
};
