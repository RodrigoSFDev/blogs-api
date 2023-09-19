const express = require('express');
const { allPosts, addPost, getIdPost, putPost } = require('../controllers/post.Controller');
const {
  authenticateToken,
  validateRequiredFields,
  validateRequiredFieldsPut } = require('../middlewares/validation');

const router = express.Router();
router.get('/:id', authenticateToken, getIdPost);
router.put('/:id', authenticateToken, validateRequiredFieldsPut, putPost);
router.post(
'/',
authenticateToken,
validateRequiredFields,
addPost,
);

router.get('/', authenticateToken, allPosts);

module.exports = router;