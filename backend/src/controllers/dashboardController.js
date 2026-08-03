import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalCourses = await prisma.course.count({
      where: {
        userId,
      },
    });

    const totalMaterials = await prisma.material.count({
      where: {
        course: {
          userId,
        },
      },
    });

    const totalFlashcards = await prisma.flashcard.count({
      where: {
        material: {
          course: {
            userId,
          },
        },
      },
    });

    const totalQuizQuestions = await prisma.quizQuestion.count({
      where: {
        material: {
          course: {
            userId,
          },
        },
      },
    });

    const recentUploads = await prisma.material.findMany({
      where: {
        course: {
          userId,
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
      take: 5,
      include: {
        course: true,
      },
    });

    res.json({
      totalCourses,
      totalMaterials,
      totalFlashcards,
      totalQuizQuestions,
      recentUploads,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};