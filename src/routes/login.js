const express = require('express');
const { checkRequired, checkUserExistence } = require('../middlewares/validation');
const { login } = require('../controllers/login.Controller');



const router = express.Router();

router.post('/',checkRequired, checkUserExistence, login);

module.exports = router;