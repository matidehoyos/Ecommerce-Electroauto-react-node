const { findReviews } = require("../services/reviewService");



const getReviews= async (req, res) => {
    try {
        const reviews = await findReviews();
        res.status(200).json(reviews)
    } catch (error) {
        console.error();
        res.status(500).json(error.message)
    }

}

module.exports = getReviews