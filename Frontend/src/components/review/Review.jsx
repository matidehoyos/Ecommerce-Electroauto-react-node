import style from "./Review.module.css";
import { useEffect, useState } from "react";
import reviewsProvider from "../../utils/provider/reviewsProvider";
import ReviewCard from "../reviewCard/ReviewCard";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  const bringData = async () => {
    const reviews = await reviewsProvider.getReviews();
    setReviews(reviews);
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
                  { reviews.length ?
                    reviews.map((review, index) => (
                      review.name ? <ReviewCard key={index} review={review} /> : null
                    ))
                  : null } 
          </div>
    </div>
  );
}


export default Review
