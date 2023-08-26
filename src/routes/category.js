const express = require('express');
const {
  createCategoryController,
  getAllCategoriesController,
} = require('../controllers/category.Controller');
const { authenticateToken } = require('../middlewares/validation');

const router = express.Router();

router.post('/', authenticateToken, createCategoryController);
router.get('/', authenticateToken, getAllCategoriesController);

module.exports = router;