import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  askQuestion,
  getChatHistory,
} from "../controllers/chatController.js";

const router = express.Router();

// Ask AI a question
router.post("/ask", protect, askQuestion);

// Get previous chat history for a material
router.get("/history/:materialId", protect, getChatHistory);

export default router;