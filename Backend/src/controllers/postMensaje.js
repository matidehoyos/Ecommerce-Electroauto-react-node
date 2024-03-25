const { postMensajes } = require("../services/mensajeService");

const postMensaje = async (req, res) => {

  try {
    const { name, email, mensaje } = req.body; 

    const message = await postMensajes({
        name,
        email,
        mensaje
    });
        return res.status(200).json(message);

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear mensaje' });
}
};

module.exports = postMensaje