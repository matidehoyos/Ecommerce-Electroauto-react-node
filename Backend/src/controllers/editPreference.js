const { editarEstadoPreference } = require("../services/preferenceService");

const editPreference = async (req, res) => {
    try {
        const id = req.params.id;
        const envio = await editarEstadoPreference(id);
        res.json(envio);
      } catch (error) {
        console.error('Error:', error);
        console.log(error)
        res.status(500).json({ error: error.message });
      }
}
module.exports = editPreference