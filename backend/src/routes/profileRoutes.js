import express from "express";

import protect from "../middleware/authMiddleware.js";
import imageUpload from "../config/imageUpload.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", protect, getProfile);

router.put(
  "/",
  protect,
  imageUpload.single("photo"),
  updateProfile
);

export default router;