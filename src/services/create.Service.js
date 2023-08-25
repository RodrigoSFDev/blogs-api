const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function generateToken(user) {
  const payload = {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    image: user.image,
  };

  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);

  return token;
}

async function createUser(displayName, email, password, image) {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      displayName,
      password,
      image,
    },
  });

  if (!created) {
    return Promise.reject(new Error('User already registered'));
  }

  const token = generateToken(user);

  return token;
}

module.exports = { createUser };
