const { createToken } = require('../auth/authJWT');
const { User } = require('../models');

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

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = createToken(userWithoutPassword);

  return token;
}

module.exports = { createUser };
