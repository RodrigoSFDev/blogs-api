const express = require('express');
const {
  getUsersController,
  getUserByIdController,
  createController } = require('../controllers/User.Controller');
const { authenticateToken } = require('../middlewares/validation');

const router = express.Router();

router.post('/', createController);
router.get('/', authenticateToken, getUsersController);
router.get('/:id', authenticateToken, getUserByIdController);

module.exports = router;