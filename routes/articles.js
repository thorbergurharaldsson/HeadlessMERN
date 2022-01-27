import express from "express";
let router = express.Router();

// Article Model
import articleSchema from "../schemas/article.js";

// GET all Articles
router.route("/").get((req, res) => {
	articleSchema.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// GET a single Article
router.route("/:id").get((req, res) => {
	articleSchema.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// PUT: Update Article
router.route("/:id").put((req, res, next) => {
	articleSchema.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		(error, data) => {
			if (error) {
				return next(error);
				console.log(error);
			} else {
				res.json(data);
				console.log("Blog updated successfully !");
			}
		}
	);
});

// POST: Create Article
router.route("/").post((req, res, next) => {
	articleSchema.create(req.body, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

// DELETE Article
router.route("/:id").delete((req, res, next) => {
	articleSchema.findByIdAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

export default router;
