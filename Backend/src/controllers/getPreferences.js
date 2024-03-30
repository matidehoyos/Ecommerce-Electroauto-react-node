const { findAllPreferences} = require("../services/preferenceService")


const getPreferences = async (req, res) => {
    try {
        const preferences = await findAllPreferences()
        res.status(200).json(preferences)
    } catch (error) {
        console.error();
        res.status(500).json(error.message)
    }

}

module.exports = getPreferences