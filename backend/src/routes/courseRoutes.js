import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.route("/")
  .post(protect, createCourse)
  .get(protect, getCourses);

router.route("/:id")
  .get(protect, getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

export default router;