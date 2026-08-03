import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createAssignment)
  .get(protect, getAssignments);

router
  .route("/:id")
  .put(protect, updateAssignment)
  .delete(protect, deleteAssignment);

export default router;