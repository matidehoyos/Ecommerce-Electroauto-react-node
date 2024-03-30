const { updatePreferenceEnvio } = require("../services/preferenceService")



const editarEnvio = async (req, res) => {
    try {
        const { preferenceId, datosEnvio } = req.body
        const response = await updatePreferenceEnvio(preferenceId,datosEnvio)
        res.status(200).json(response)

    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = editarEnvio