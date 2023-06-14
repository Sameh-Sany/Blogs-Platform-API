const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
