const userService = require('../services/user.Service');

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

module.exports = { getUsersController, getUserByIdController };
