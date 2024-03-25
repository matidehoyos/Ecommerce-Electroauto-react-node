const { createReview } = require("../services/reviewService");


const postReviews = async (req, res) => {
  try {
    const { name, email, image, rating, message} = req.body;

    const nuevaReview= await createReview({
      name,
      email,
      image,
      rating,
      message
    });

    return res.status(201).json({ success: true, mensaje: nuevaReview});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error al crear la review' });
  }
};

module.exports = postReviews;