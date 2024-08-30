import ReviewForm from "../reviewForm/ReviewForm";
import ReviewCard from "../reviewCard/ReviewCard";
import style from "./Review.module.css";
import ReviewRating from "../reviewRating/ReviewRating";
import ReviewsButton from "../reviewsButton/ReviewsButton";
import { useEffect, useState } from "react";
import reviewsProvider from "../../utils/provider/reviewsProvider";

const Review = () => {
  const [mensajes, setMensajes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const bringData = async () => {
    const reviews = await reviewsProvider.getReviews();
    setReviews(reviews);
    const ultimosCuatroReviews = reviews.slice(-5);
    setMensajes(ultimosCuatroReviews);
}

const addReview = (newReview) => {
  setReviews(prevReviews => [...prevReviews, newReview]);
  bringData();
}

useEffect(() => {
    bringData();
}, []); 

  return (
    <div className={style.container}>
      <div className={style.titulo}>
        <h4>Reseñas de nuestros clientes</h4>
      </div>
      <div className={style.cardContainer}>
                  { reviews?.length ?
                    reviews?.map((review, index) => (
                      review.name ? <ReviewCard key={index} review={review} /> : null
                    ))
                  : null } 
          </div>
          {/*}
          <div className={style.formAndPromedio}>
              <div className={style.formContainer}>
                <ReviewForm addReview={addReview} /> 
              </div>
          </div>   */}
    </div>
  );
}


export default Review
