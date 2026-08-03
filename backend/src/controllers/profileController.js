import prisma from "../config/prisma.js";

// GET Logged-in User Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        photo: true,
        university: true,
        department: true,
        level: true,
        cgpaScale: true,
      },
    });

    res.json(profile);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile.",
    });
  }
};

// UPDATE Logged-in User Profile
export const updateProfile = async (req, res) => {
  try {

    const {
      university,
      department,
      level,
      cgpaScale,
    } = req.body;

    const photo = req.file
    ? `/uploads/${req.file.filename}`
    : undefined;

    const updatedProfile = await prisma.user.update({
      where: {
        id: req.user.id,
      },

      data: {
        university,
        department,
        level,
        cgpaScale: Number(cgpaScale),

        ...(photo && { photo }),
      },
    });

    res.json({
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update profile.",
    });

  }
};