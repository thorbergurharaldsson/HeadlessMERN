import { Router } from "express";
const router = Router();
// Set default API response
router.get("/", (req, res) => {
  res.send("Welcome to Headless MERN CMS");
});

import {
  indexArticles,
  newArticle,
  viewArticle,
  updateArticle,
  deleteArticle,
} from "./articlesController.js";

router.route("/articles").get(indexArticles).post(newArticle);

router
  .route("/articles/:article_id")
  .get(viewArticle)
  .patch(updateArticle)
  .delete(deleteArticle);

// Export API routes
export default router;
