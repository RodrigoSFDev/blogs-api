const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { User } = require('../models/index'); 

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
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1]; // Remove 'Bearer' prefix

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    req.user = decoded;
    next();
  });
}

module.exports = {
  checkRequired,
  checkUserExistence,
  authenticateToken,
};