const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function findUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function authenticateUser(email) {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }
  const payload = {
    id: user.id,
    display_name: user.display_name,
    email: user.email,
    image: user.image
  };

  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);

  return token;
}

module.exports = { findUserByEmail, authenticateUser };
