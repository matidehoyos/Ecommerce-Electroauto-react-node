import React from 'react'
import style from './NotFound.module.css'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
      };

    return (
        <div className={style.notFound}>
        
        <div className={style.img}>
            <img src= "./images/404NotFound.png" />
        </div>
        
        <h1>{("NotFoundPage.part1")}</h1>
        <p>
        {("NotFoundPage.part2")}
        <br />
        {("NotFoundPage.part3")}
        <br />
        {("NotFoundPage.part4")}
        <br />
        {("NotFoundPage.part5")}
        <br />
        {("NotFoundPage.part6")}
        <br />
        <br />
        {("NotFoundPage.part7")}
      </p>
      <br />
      <button className={style.button} onClick={handleClick}>{t("NotFoundPage.button")}</button>
        </div>
    )
}

export default NotFound