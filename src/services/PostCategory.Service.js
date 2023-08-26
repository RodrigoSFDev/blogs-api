const { BlogPost, PostCategory, Category, User } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
const category = categoryIds.map((categoryId) => Category.findByPk(categoryId));

if ((await Promise.all(category)).some((categ) => categ === null)) {
  return { data: { message: 'one or more "categoryIds" not found' } };
}

  const newDate = new Date();
  const post = await BlogPost.create({ title,
  content, 
userId,
    published: newDate,
    updated: newDate });

    categoryIds.forEach((categoryId) => PostCategory.create({
    postId: post.id,
    categoryId,
  }));
  const newPost = await BlogPost.findByPk(post.id);
  return { data: newPost };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
};