const express = require('express');
const { createCategoryController } = require('../controllers/category.Controller');
const { authenticateToken } = require('../middlewares/validation');

const router = express.Router();

router.post('/', authenticateToken, createCategoryController);

module.exports = router;