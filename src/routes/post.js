const express = require('express');
const { allPosts, addPost } = require('../controllers/post.Controller');
const {
  authenticateToken, validateRequiredFields } = require('../middlewares/validation');

const router = express.Router();

router.post(
'/',
authenticateToken,
validateRequiredFields,
addPost,
);
router.get('/', authenticateToken, allPosts);

module.exports = router;