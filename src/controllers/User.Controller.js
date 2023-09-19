const userService = require('../services/login.Service');
const loginService = require('../services/user.Service');

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
    
    const token = await loginService.createUser(displayName, email, password, image);
    res.status(201).json({ token });
  } catch (error) {
    if (error.message === 'User already registered') {
      return res.status(409).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    const userData = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    };
  
    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUsersController,
  getUserByIdController,
  createController,
};
