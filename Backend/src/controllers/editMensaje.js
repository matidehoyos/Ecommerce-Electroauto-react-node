const { marcarComoLeido } = require("../services/mensajeService");

const editMensaje = async (req, res) => {
    try {
        const id = req.params.id;
        const mensaje = await marcarComoLeido(id);
        res.json({ mensaje });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
      }
}

module.exports = editMensaje