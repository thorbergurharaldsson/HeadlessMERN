import { Router } from "express";
const router = Router();
// Set default API response
router.get("/", (req, res) => {
  res.send("Welcome to Headless MERN CMS");
});

// ------- Article Routes -------

import {
  indexArticles,
  newArticle,
  viewArticleByID,
  updateArticle,
  deleteArticle,
} from "./articlesController.js";

router.route("/articles").get(indexArticles).post(newArticle);

router
  .route("/articles/:article_id")
  .get(viewArticleByID)
  .patch(updateArticle)
  .delete(deleteArticle);

// ------- Comment Routes -------

import { viewCommentByArticleID, newComment } from "./commentController.js";

router
  .route("/comments/:article_id")
  .get(viewCommentByArticleID)
  .post(newComment);

router.route("");
// Export API routes
export default router;
