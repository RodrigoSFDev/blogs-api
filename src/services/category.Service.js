const { Category } = require('../models');

async function createCategory(name) {
  if (!name) {
    throw new Error('"name" is required');
  }
  const category = await Category.create({ name });
  return category;
}

async function getAllCategories() {
  const categories = await Category.findAll();
  return categories;
}

module.exports = { createCategory, getAllCategories };