const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllPosts = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        categories: true,
      },
    });
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        categories: true,
      },
    });
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, published } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        publishedAt: new Date(),
        authorId: req.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json({
      success: true,
      meessage: "Post created successfully",
      statusCOde: 201,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        published,
      },
    });
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      statusCode: 200,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).json({
      success: true,
      message: "Post deleted successfully",
      statusCode: 204,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
