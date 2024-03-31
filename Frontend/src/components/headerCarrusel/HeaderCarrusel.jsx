import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './HeaderCarrusel.module.css';

const HeaderCarrusel = () => {

  const [image, setImage] = useState([
    { url: 'carru1.jpeg'},
    { url: 'carru2.jpeg'},
    { url: 'carru3.jpeg'},
    { url: 'carru4.jpeg'},
    { url: 'carru5.jpeg'},
    { url: 'carru6.jpeg'},
    { url: 'carru7.jpeg'},
    { url: 'carru8.jpeg'},
    { url: 'carru9.jpeg'},
    { url: 'carru10.jpeg'},
    { url: 'carru11.jpeg'},
  ])
  

  const carouselSettings = {
    showArrows: false,
    showThumbs: false,
    showStatus: false,
    infiniteLoop: true,
  }

  return (
      <div className={style.containerCarrusel}>
        <Carousel {...carouselSettings} autoPlay={true} interval={2000} infiniteLoop={true} className={style.carouselStyles} >
          {
            image.map((imagen, index) => (
              <div key={index} className={style.caja}>
                <img className={style.carruImg} src={imagen.url} alt={`Image n${index}`} />
              </div>
            ))
          }
        </Carousel>
      </div>
  )
}

export default HeaderCarrusel;