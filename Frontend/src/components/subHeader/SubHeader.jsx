import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import style from './SubHeader.module.css'
import { FaCheck } from "react-icons/fa";
import Populares from '../populares/Populares';

const SubHeader = () => {
  const [showCarrusel, setShowCarrusel] = useState(false);
  const [animatedCarrusel, setAnimatedCarrusel] = useState(false);
  const carruselRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      const topPos = (element) => element.getBoundingClientRect().top;
      const posCarrusel = topPos(carruselRef.current);

      if (!showCarrusel && window.scrollY > (posCarrusel - 800) && !animatedCarrusel) {
        setShowCarrusel(true);
        setAnimatedCarrusel(true);
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [showCarrusel, animatedCarrusel]); 

  return (
    <div className={style.container} ref={carruselRef} >
        <div className={style.populares}>
            <h4>Más vendidos</h4>
            <div className={style.cateContainer}>
            <Populares />
            </div>
        </div>
        <div className={`${style.carrusel} ${showCarrusel ? style.animate : ''}`}>
            <h4>Categorias</h4>
            <div className={style.carrusaCajasContainer}>
                <div className={style.box}>
              <Link to="/iluminacion">
                    <h4>Iluminacion</h4>
                    <div className={style.boxImg}>
                        <img src="le.jpeg" alt="imagen luz led" />
                    </div>
              </Link>
                </div>
                <div className={style.box}>
              <Link to="/audio">
                    <h4>Audio</h4>
                    <div className={style.boxImg}>
                        <img src="au.jpeg" alt="parlante audio" />
                    </div>
              </Link>
                </div>
                <div className={style.box}>
              <Link to="/accesorios">
                    <h4>Accesorios</h4>
                    <div className={style.boxImg}>
                        <img src="ac.jpeg" alt="imagen toxicshine" />
                    </div>
              </Link>
                </div>
                <div className={style.box}>
              <Link to="/seguridad">
                  <h4>Seguridad</h4>
                  <div className={style.boxImg}>
                      <img src="mat.jpeg" alt="imagen cierre centralizado" />
                  </div>
              </Link> 
              </div>
            </div>
        </div>
    </div>
  );
};

export default SubHeader;
