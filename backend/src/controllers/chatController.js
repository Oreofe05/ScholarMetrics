import prisma from "../config/prisma.js";
import { chatWithMaterial } from "../services/chatService.js";

export const askQuestion = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const materialId = req.body?.materialId;
    const question = req.body?.question;

    if (!materialId || !question) {
      return res.status(400).json({
        message: "Material ID and question are required.",
      });
    }

    const answer = await chatWithMaterial(materialId, question);

    await prisma.chatHistory.create({
      data: {
        materialId,
        question,
        answer,
      },
    });

    return res.status(200).json({
      question,
      answer,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { materialId } = req.params;

    const material = await prisma.material.findFirst({
      where: {
        id: materialId,
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

    const history = await prisma.chatHistory.findMany({
      where: {
        materialId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(history);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};