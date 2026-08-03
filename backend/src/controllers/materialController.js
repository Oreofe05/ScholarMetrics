import prisma from "../config/prisma.js";
import { extractPDFText } from "../services/pdfService.js";
import { cleanText } from "../services/textCleaner.js";
import { chunkText } from "../services/textChunker.js";

import {
  generateSummary,
  generateFlashcards,
  generateQuiz,
  generateStudyPlan,
} from "../services/aiService.js";
//import { generateEmbedding } from "../services/embeddingService.js";

export const uploadMaterial = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const courseId = req.body?.courseId;

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file.",
      });
    }

    // Check ownership
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        userId: req.user.id,
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    // Save material
    const material = await prisma.material.create({
      data: {
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: req.file.path,
        courseId,
      },
    });

    // Extract PDF text
    const extracted = await extractPDFText(req.file.path);

    // Clean text
    const cleanedText = cleanText(extracted.text);

    // Chunk text
    const chunks = chunkText(cleanedText);

    // Save chunks
    await prisma.materialChunk.createMany({
      data: chunks.map((chunk, index) => ({
        content: chunk,
        chunkIndex: index + 1,
        materialId: material.id,
      })),
    });

    // Retrieve chunks
    const savedChunks = await prisma.materialChunk.findMany({
      where: {
        materialId: material.id,
      },
      orderBy: {
        chunkIndex: "asc",
      },
    });

    // Track AI generation results
    let summaryGenerated = false;
    let flashcardsGenerated = 0;
    let quizGenerated = 0;
    let studyPlanGenerated = false;

    // =========================
    // SUMMARY
    // =========================
    try {
      const summary = await generateSummary(savedChunks);

      await prisma.materialSummary.create({
        data: {
          summary,
          materialId: material.id,
        },
      });

      summaryGenerated = true;

    } catch (error) {
      console.log("Summary skipped:", error.message);
    }

    // =========================
    // FLASHCARDS
    // =========================
    try {
      const flashcards = await generateFlashcards(savedChunks);

      await prisma.flashcard.createMany({
        data: flashcards.map(card => ({
          question: card.question,
          answer: card.answer,
          materialId: material.id,
        })),
      });

      flashcardsGenerated = flashcards.length;

    } catch (error) {
      console.log("Flashcards skipped:", error.message);
    }

    // =========================
    // QUIZ
    // =========================
    try {
      const quiz = await generateQuiz(savedChunks);

      await prisma.quizQuestion.createMany({
        data: quiz.map(question => ({
          question: question.question,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer: question.correctAnswer,
          materialId: material.id,
        })),
      });

      quizGenerated = quiz.length;

    } catch (error) {
      console.log("Quiz skipped:", error.message);
    }

    // =========================
    // STUDY PLAN
    // =========================
    try {
      const studyPlan = await generateStudyPlan(savedChunks);

      await prisma.studyPlan.create({
        data: {
          plan: studyPlan,
          materialId: material.id,
        },
      });

      studyPlanGenerated = true;

    } catch (error) {
      console.log("Study Plan skipped:", error.message);
    }

    // =========================
    // INITIALIZE STUDY PROGRESS
    // =========================
    await prisma.studyProgress.create({
      data: {
        materialId: material.id,
      },
    });

    // Final response
    return res.status(201).json({
      message: "Material uploaded successfully.",
      material,
      pages: extracted.pages,
      totalChunks: chunks.length,
      summaryGenerated,
      flashcardsGenerated,
      quizGenerated,
      studyPlanGenerated,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMaterials = async (req, res) => {
  try {

    const materials = await prisma.material.findMany({
      where: {
        course: {
          userId: req.user.id,
        },
      },
      include: {
        course: true,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    res.json(materials);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getMaterial = async (req, res) => {

  try {

    const { id } = req.params;

    const material = await prisma.material.findFirst({

      where: {
        id,
        course: {
          userId: req.user.id,
        },
      },

      include: {
        summary: true,
        flashcards: true,
        quizQuestions: true,
        studyPlan: true,
      },

    });

    if (!material) {

      return res.status(404).json({
        message: "Material not found.",
      });

    }

    res.json(material);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

export const deleteMaterial = async (req, res) => {

  try {

    const { id } = req.params;

    const material = await prisma.material.findFirst({

      where: {
        id,
        course: {
          userId: req.user.id,
        },
      },

    });

    if (!material) {

      return res.status(404).json({
        message: "Material not found.",
      });

    }

    await prisma.material.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Material deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};