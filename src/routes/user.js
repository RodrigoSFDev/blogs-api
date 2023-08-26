const express = require('express');
const { createController } = require('../controllers/create.Controller');
const { getUsersController } = require('../controllers/getUser.Controller');
const { authenticateToken } = require('../middlewares/validation');

const router = express.Router();

router.post('/', createController);
router.get('/', authenticateToken, getUsersController);

module.exports = router;