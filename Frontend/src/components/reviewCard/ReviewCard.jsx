import style from "./ReviewCard.module.css";
import { FaStarHalfAlt } from 'react-icons/fa';
import { GoStarFill } from "react-icons/go";

const ReviewCard = ({ review }) => {

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<GoStarFill key={i} color="" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#8700b0" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<GoStarFill key={`empty-${i}`} color="lightgrey" />);
    }
    return stars;
  };


  return (
    <div className={style.container}>
          <div className={style.image}>
             <img src={review.image} alt='imagen usuario'/>
          </div>
          <div className={style.text}>
              <h4 className={style.name}>{review.name}</h4>
              <p className={style.fecha}>{review.date.slice(0,10)}</p>
              <p className={style.message}>{review.message}</p>
              <div className={style.containerStarts}>
                  <p>{renderStars()}</p>
              </div>
          </div>
    </div>
  );
};

export default ReviewCard
