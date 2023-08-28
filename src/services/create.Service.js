const { createToken } = require('../auth/authJWT');
const { User } = require('../models');

function generateToken(user) {
  const payload = {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    image: user.image,
  };

  const token = createToken(payload);

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
