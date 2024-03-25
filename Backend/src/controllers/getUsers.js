const { findUsers } = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    return res.status(201).json(users);
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
};

module.exports = getUsers;