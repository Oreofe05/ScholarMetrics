import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import progressRoutes from "./routes/progressRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import profileRoutes from "./routes/profileRoutes.js";
import path from "path";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";



dotenv.config();

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
 app.use("/uploads", express.static(path.resolve("uploads")));
// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "Scholar Metrics API Running 🚀",
  });
});

// ===============================
// API Routes
// ===============================

// Authentication
app.use("/api/auth", authRoutes);

// Users
app.use("/api/users", userRoutes);

// Courses
app.use("/api/courses", courseRoutes);

// Materials
app.use("/api/materials", materialRoutes);

// Chat
app.use("/api/chat", chatRoutes);

//Dashboard
app.use("/api/dashboard", dashboardRoutes);

//Swagger
app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec)
);

// Profile
app.use("/api/profile", profileRoutes);

//Progress
app.use("/api/progress", progressRoutes);

//Assignment
app.use("/api/assignments", assignmentRoutes);

//Result
app.use("/api/results", resultRoutes);
// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});