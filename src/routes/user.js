const express = require('express');
const { createController } = require('../controllers/create.Controller');

const router = express.Router();

router.post('/', createController);

module.exports = router;