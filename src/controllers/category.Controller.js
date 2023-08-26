const categoryService = require('../services/category.Service');

const createCategoryController = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createCategoryController };