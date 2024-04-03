import React, { useEffect, useState } from 'react';
import { GoStarFill } from "react-icons/go";
import style from "./ReviewForm.module.css";
import reviewsProvider from '../../utils/provider/reviewsProvider';
import { useSelector } from 'react-redux';

const ReviewForm = ({addReview}) => {
  const user = JSON.parse(localStorage.getItem('user'));
 const [info, setInfo] = useState({});


  useEffect(() => {
    if (user) {
      setInfo({
        name: user.name,
        email: user.email,
        image: user.image,
        rating: 0,
        message: ''
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (newRating) => {
    const updatedRating = newRating === info.rating ? newRating - 1 : newRating;

    setInfo({
      ...info,
      rating: updatedRating
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await reviewsProvider.postReview(info);
    addReview(info);
    setInfo({
      name: '',
      email: '',
      image: '',
      rating: 0,
      message: ''
    });
  };

  return (
    <div className={style.container}>
    <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.linea}>
          <label>Dejanos tu reseña: </label>
          <textarea key='message' name='message' value={info.message} rows="5" onChange={handleChange} />
        </div>

        <div className={style.starts}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              className={style.estrellas}
              key={value}
              onClick={() => handleRatingChange(value)}
              style={{
                color: value <= info.rating ? 'gold' : 'grey',
              }}
            >
              <GoStarFill />
            </span>
          ))}
        </div>
        {
          user?.name ?      
        <div className={style.containerButton}>
          <button type="submit" disabled={info.message === ''}>Enviar reseña</button>
        </div>
        : 'Debes hacer una compra para poder dejar tu reseña'
        }
      </form>
    </div>
  );
};

export default ReviewForm;
