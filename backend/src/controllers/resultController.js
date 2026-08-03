import prisma from "../config/prisma.js";
import { calculateCGPA } from "../services/cgpaService.js";

// Get all results
export const getResults = async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(results);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Result
export const createResult = async (req, res) => {
  try {
    const {
      courseCode,
      courseTitle,
      unit,
      score,
      semester,
      session,
    } = req.body;

    const getGrade = (score) => {
      if (score >= 70) return { grade: "A", point: 5 };
      if (score >= 60) return { grade: "B", point: 4 };
      if (score >= 50) return { grade: "C", point: 3 };
      if (score >= 45) return { grade: "D", point: 2 };
      if (score >= 40) return { grade: "E", point: 1 };
      return { grade: "F", point: 0 };
    };

    const gradeInfo = getGrade(Number(score));

    const result = await prisma.result.create({
      data: {
        courseCode,
        courseTitle,
        unit: Number(unit),
        score: Number(score),
        grade: gradeInfo.grade,
        gradePoint: gradeInfo.point,
        semester,
        session,
        userId: req.user.id,
      },
    });

    res.status(201).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Result
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.result.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    const updated = await prisma.result.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Result
export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.result.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    await prisma.result.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Result deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Calculate CGPA
export const getCGPA = async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const cgpa = calculateCGPA(results);

    res.json(cgpa);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};