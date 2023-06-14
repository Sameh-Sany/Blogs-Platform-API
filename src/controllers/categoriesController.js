const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json({
      success: true,
      meessage: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
      },
    });
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
