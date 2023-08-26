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

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching categories' });
  }
};

module.exports = { createCategoryController, getAllCategoriesController };