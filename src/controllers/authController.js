const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "success",
      statusCode: 200,
      data: {
        user,
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: {
        user,
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
