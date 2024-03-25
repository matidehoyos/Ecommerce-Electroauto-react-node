const { findPreferenceById } = require("../services/preferenceService")


const getPreferenceById= async (req, res) => {
    try {
        const id = req.query.id;
        const preference = await findPreferenceById(id)
        res.status(200).json(preference.dataValues)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = getPreferenceById