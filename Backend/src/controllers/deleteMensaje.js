const { eliminarMensaje } = require("../services/mensajeService");


const deleteMensaje = async (req, res) => {
    try {
        const mensajeId = req.params.mensajeId;

        const mensaje = await eliminarMensaje(mensajeId);
        res.status(200).json(mensaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el mensaje' });
    }
}

module.exports = deleteMensaje;