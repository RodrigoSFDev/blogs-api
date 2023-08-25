const userService = require('../services/create.Service');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function validateFields(displayName, email, password) {
  if (displayName.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
  if (!isValidEmail(email)) {
    throw new Error('"email" must be a valid email');
  }
  if (password.length < 6) {
    throw new Error('"password" length must be at least 6 characters long');
  }
}

const createController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    await validateFields(displayName, email, password);
    
    const token = await userService.createUser(displayName, email, password, image);
    res.status(201).json({ token });
  } catch (error) {
    if (error.message === 'User already registered') {
      return res.status(409).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createController };