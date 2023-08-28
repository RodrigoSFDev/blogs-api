const express = require('express');
const { allPosts, addPost, getIdPost } = require('../controllers/post.Controller');
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
router.get('/:id', authenticateToken, getIdPost);

module.exports = router;