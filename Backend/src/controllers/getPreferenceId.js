const { findPreferenceByPreferenceId } = require("../services/preferenceService");


const getPreferenceId= async (req, res) => {
    try {
        const {id} = req.params;
        const preference = await findPreferenceByPreferenceId(id)
        res.status(200).json(preference.dataValues)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = getPreferenceId