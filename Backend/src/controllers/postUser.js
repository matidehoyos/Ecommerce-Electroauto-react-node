const { findUserByEmail, createUser } = require("../services/userService");

const postUser = async (req, res) => {

  try {
    const { email, name, image, role } = req.body; 

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(200).json({ message: 'Usuario existente', user: existingUser });
    }

    const newUser = await createUser({
        email,
        name,
        image, 
        role
    });
      return res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verificar el usuario' });
}
};

module.exports = postUser