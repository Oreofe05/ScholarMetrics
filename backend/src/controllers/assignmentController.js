import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export const getAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        deadline: "asc",
      },
    });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssignment = async (req, res) => {
  try {
    const { title, course, deadline, priority } = req.body;

    const assignment = await prisma.assignment.create({
      data: {
        title,
        course,
        deadline: new Date(deadline),
        priority,
        userId: req.user.id,
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await prisma.assignment.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const updated = await prisma.assignment.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await prisma.assignment.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    await prisma.assignment.delete({
      where: { id },
    });

    res.json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};