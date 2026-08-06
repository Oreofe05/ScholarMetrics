import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Account created successfully.",
      token: generateToken(user.id),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
// Login User
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    res.json({

      token: generateToken(user.id),

      user: {

        id: user.id,
        fullName: user.fullName,
        email: user.email,

      },

    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });

  }

};