import { Router } from "express";
const router = Router();
// Set default API response
router.get("/", (req, res) => {
  res.send("Welcome to Headless MERN CMS");
});

import { indexArticles, newArticle } from "./articlesController.js";

router.route("/articles").get(indexArticles).post(newArticle);

// Export API routes
export default router;
