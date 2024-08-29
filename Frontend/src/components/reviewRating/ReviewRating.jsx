import { GoStarFill } from "react-icons/go";
import style from "./ReviewRating.module.css";

export default function ReviewRating({ reviews }) {
  const sum = reviews?.reduce((sum, rating) => sum + rating.rating, 0)
  const numReviews = reviews?.length
  const average = sum / numReviews

  const renderStars = () => {
    const numStars = Math.round(average);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<GoStarFill key={i} style={{ color: "#8700b0" }} />);
    }
    return stars;
  };


  return (
    <div className={style.container}>
          <h2 className={style.rating}>{average?.toFixed(1)}</h2>
          <h4>{renderStars()}</h4>
    </div>
  );
};