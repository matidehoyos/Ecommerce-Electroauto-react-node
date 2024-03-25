

const PostEnvio = async (req, res) => {
    try {
        const {datos} = req.body;
        const envio = await editarEstadoPreference(id);
        res.json(preference);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
      }
}

module.exports = PostEnvio