const { findMensaje } = require("../services/mensajeService");

const getMensaje = async (req, res) => {

  try {
    const message = await findMensaje();
        return res.status(200).json(message);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar mensaje' });
}
};

module.exports = getMensaje