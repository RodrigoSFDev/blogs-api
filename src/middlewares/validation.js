const { User } = require('../models'); 
const { getPayload } = require('../auth/authJWT');

function checkRequired(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
}

async function checkUserExistence(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  req.user = user;
  next();
}

function authenticateToken(req, res, next) {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const [, newToken] = token.split(' ');
    const user = getPayload(newToken);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

const validateRequiredFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateRequiredFieldsPut = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
  checkRequired,
  checkUserExistence,
  authenticateToken,
  validateRequiredFields,
  validateRequiredFieldsPut,
};