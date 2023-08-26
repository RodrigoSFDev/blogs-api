const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function authenticateUser(email, password) {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return null;
  }
  const payload = {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    image: user.image,
  };

  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);

  return token;
}

async function getAllUsers() {
  try {
    const users = await User.findAll({
      attributes: ['id', 'displayName', 'email', 'image'],
    });
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'displayName', 'email', 'image'],
    });
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}

module.exports = { authenticateUser, getAllUsers, getUserById };
