import express from "express";
let router = express.Router();

// Assignment Model
import assignmentsSchema from "../schemas/assignmentsModel.js";

// GET all Assignments
router.route("/").get((req, res) => {
  assignmentsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// GET a single Assignment
router.route("/:id").get((req, res) => {
  assignmentsSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// PUT: Update Assignment
router.route("/:id").put((req, res, next) => {
  assignmentsSchema.findByIdAndUpdate(
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
        console.log("Assignment updated successfully !");
      }
    }
  );
});

// DELETE Assignment
router.route("/:id").delete((req, res, next) => {
  assignmentsSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
