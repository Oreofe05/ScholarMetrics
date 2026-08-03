import prisma from "../config/prisma.js";

// ======================================
// Create Course
// ======================================
export const createCourse = async (req, res) => {
  try {
    const {
  courseCode,
  courseName,
  units,
  semester,
  level,
  examDate,
} = req.body;

    if (!courseCode || !courseName) {
      return res.status(400).json({
        message: "Course code and course name are required.",
      });
    }

    const course = await prisma.course.create({
      data: {
        courseCode,
        courseName,
        units,
        semester,
        level,
        examDate: examDate ? new Date(examDate) : null,
        userId: req.user.id,
        },
    });

    res.status(201).json(course);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// Get All Courses
// ======================================
export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
        where: {
            userId: req.user.id,
        },

        include: {
            materials: {
            include: {
                summary: true,
                flashcards: true,
                quizQuestions: true,
                studyPlan: true,
                progress: true,
            },
            },
        },


        orderBy: {
            createdAt: "desc",
        },
        });

    res.json(courses);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// Get One Course
// ======================================
export const getCourse = async (req, res) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },

      include: {
        materials: {
          include: {
            summary: true,
            flashcards: true,
            quizQuestions: true,
            studyPlan: true,
            progress: true,
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    res.json(course);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// Update Course
// ======================================
export const updateCourse = async (req, res) => {
  try {
    const {
        courseCode,
        courseName,
        units,
        semester,
        level,
        examDate,
        } = req.body;

    const course = await prisma.course.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    const updatedCourse = await prisma.course.update({
      where: {
        id: course.id,
      },
      data: {
            courseCode,
            courseName,
            units,
            semester,
            level,
            examDate: examDate ? new Date(examDate) : null,
            },
    });

    res.json(updatedCourse);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// Delete Course
// ======================================
export const deleteCourse = async (req, res) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    await prisma.course.delete({
      where: {
        id: course.id,
      },
    });

    res.json({
      message: "Course deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

