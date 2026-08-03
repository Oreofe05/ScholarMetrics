import prisma from "../config/prisma.js";

export const updateProgress = async (req, res) => {
  try {
    const { materialId } = req.params;

    const {
      flashcardsViewed,
      quizzesTaken,
      averageQuizScore,
      completed,
    } = req.body;

    const progress = await prisma.studyProgress.update({
      where: {
        materialId,
      },
      data: {
        flashcardsViewed,
        quizzesTaken,
        averageQuizScore,
        completed,
        lastStudied: new Date(),
      },
    });

    res.json(progress);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProgress = async (req, res) => {
  try {

    const { materialId } = req.params;

    const progress = await prisma.studyProgress.findUnique({
      where: {
        materialId,
      },
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found.",
      });
    }

    res.json(progress);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};