const { User } = require('../models/index'); 

function checkRequired(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
}

async function checkUserExistence(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  req.user = user;
  next();
}

module.exports = {
  checkRequired,
  checkUserExistence,
};