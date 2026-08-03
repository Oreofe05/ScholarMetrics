import express from "express";

import protect from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

import {
  uploadMaterial,
  getMaterials,
  getMaterial,
  deleteMaterial,
} from "../controllers/materialController.js";

const router = express.Router();


// Upload
router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadMaterial
);

// Get all materials
router.get("/", protect, getMaterials);

// Get one material
router.get("/:id", protect, getMaterial);

// Delete material
router.delete("/:id", protect, deleteMaterial);


export default router;