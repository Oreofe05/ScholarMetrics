import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getCGPA,
} from "../controllers/resultController.js";

const router = express.Router();

router.route("/")
  .post(protect, createResult)
  .get(protect, getResults);

router.get("/cgpa", protect, getCGPA);

router.route("/:id")
  .put(protect, updateResult)
  .delete(protect, deleteResult);

export default router;