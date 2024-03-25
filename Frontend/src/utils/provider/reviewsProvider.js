import axios from "axios"

const reviewsProvider = {
    async getReviews() {
        try {
            const getReviews = await axios.get(`/reviews`);
            return getReviews.data;
        } catch (error) {
            return error.message;
        }
    },
    async getReviewsAll(obj) {
        try {
            const getReviews = await axios.get(`/reviewsall`, {params: obj});
            return getReviews.data;
        } catch (error) {
            return error.message;
        }
    },
    async getReviewsByRating(obj) {
        try {
            const getReviews = await axios.get(`/reviews/rating`, {params: obj})
            return getReviews.data
        } catch (error) {
            return error.message
        }
    },
    async postReview(review) {
        try {
            const newReview = await axios.post(`/reviews`, review)
            return newReview
        } catch (error) {
            return error.message
        }
    },

}

export default reviewsProvider