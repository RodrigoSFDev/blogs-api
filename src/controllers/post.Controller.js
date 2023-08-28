const { getAllPosts, createPost, getIdPosts } = require('../services/PostCategory.Service');

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
    const post = await createPost(title, content, categoryIds, userId);
    console.log(post);
    if (!post.data.message) {
      return res.status(201).json(post.data);
    }
    return res.status(400).json(post.data);
};

const allPosts = async (_req, res) => {
  const posts = await getAllPosts();
  return res.status(200).json(posts);
};

const getIdPost = async (req, res) => {
  const { id } = req.params;
  const post = await getIdPosts(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(post);
};

module.exports = {
  allPosts,
  addPost,
  getIdPost,
};