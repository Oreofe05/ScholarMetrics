import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  updateProgress,
  getProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/:materialId", protect, getProgress);

router.put("/:materialId", protect, updateProgress);

export default router;