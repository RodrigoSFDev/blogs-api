const express = require('express');
const { allPosts } = require('../controllers/post.Controller');
const {
  authenticateToken } = require('../middlewares/validation');

const router = express.Router();
/* 
router.post('/', authenticateToken, validateRequiredFields, addPost); */
router.get('/', authenticateToken, allPosts);

module.exports = router;