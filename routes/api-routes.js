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
  newComment,
} from "./articlesController.js";

router.route("/articles").get(indexArticles).post(newArticle);

router
  .route("/articles/:article_id")
  .get(viewArticleByID)
  .patch(updateArticle)
  .delete(deleteArticle);

router.route("/articles/:article_id/comment").post(newComment);

router.route("");
// Export API routes
export default router;
