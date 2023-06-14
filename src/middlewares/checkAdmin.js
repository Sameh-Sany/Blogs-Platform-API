exports.checkAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user.role !== "ADMIN") {
      throw new Error("You are not authorized to perform this action");
    }
    next();
  } catch (error) {
    next(error);
  }
};
