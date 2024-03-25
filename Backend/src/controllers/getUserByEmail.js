const { findUserByEmail } = require("../services/userService");

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email; 

    const user = await findUserByEmail(email);
    
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar el usuario' });
  }
};

module.exports = getUserByEmail;