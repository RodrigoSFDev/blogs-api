const express = require('express');
const { createController } = require('../controllers/create.Controller');
const { getUsersController, getUserByIdController } = require('../controllers/getUser.Controller');
const { authenticateToken } = require('../middlewares/validation');

const router = express.Router();

router.post('/', createController);
router.get('/', authenticateToken, getUsersController);
router.get('/:id', authenticateToken, getUserByIdController);

module.exports = router;