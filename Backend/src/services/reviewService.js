const { Sequelize } = require("sequelize");
const { Reviews } = require("../../db.js");

const findReviews = async () => {
    try {
        return await Reviews.findAll();
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

const findReviewByRating = async (rating) => {
    try {
        const response = await Reviews.findAll({where: { rating: rating}});
        return response;
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

const createReview = async (form) => {
    try {
        const newReview = await Reviews.create(form);
        return newReview;
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}


module.exports = { findReviews, createReview, findReviewByRating };