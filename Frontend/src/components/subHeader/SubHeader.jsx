import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import style from './SubHeader.module.css'
import { FaCheckSquare } from "react-icons/fa";

const SubHeader = () => {
  const [showCarrusel, setShowCarrusel] = useState(false);
  const [showMercadoLibre, setShowMercadoLibre] = useState(false);
  const [animatedCarrusel, setAnimatedCarrusel] = useState(false);
  const [animatedMercadoLibre, setAnimatedMercadoLibre] = useState(false); 
  const carruselRef = useRef(null);
  const mercadoLibreRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      const topPos = (element) => element.getBoundingClientRect().top;
      const posCarrusel = topPos(carruselRef.current);
      const posMercadoLibre = topPos(mercadoLibreRef.current);

      if (!showCarrusel && window.scrollY > (posCarrusel - 800) && !animatedCarrusel) {
        setShowCarrusel(true);
        setAnimatedCarrusel(true);
      }

      if (!showMercadoLibre && window.scrollY > (posMercadoLibre - 100) && !animatedMercadoLibre) {
        setShowMercadoLibre(true);
        setAnimatedMercadoLibre(true); 
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [showCarrusel, showMercadoLibre, animatedCarrusel, animatedMercadoLibre]); 

  return (
    <div className={style.container}>
        <div ref={mercadoLibreRef} className={`${style.mercadoLibre} ${showMercadoLibre ? style.animateRight : ''}`}>
            <div className={style.imgML}>
                <img src="ml.png" alt="mercadolibre" />
            </div>
            <div className={style.mercadoTexto}>
                <h3>MERCADO LIBRE <br/> LIDER PLATINIUM</h3>
                <h6>COMPRA CON CONFIANZA</h6>
                <p><FaCheckSquare className={style.ico}/>MAS DE 10 MIL VENTAS</p>
                <p><FaCheckSquare className={style.ico}/>MAS DE 10 AÑOS DE EXPERIENCIA</p>
            </div>
        </div>
        <div ref={carruselRef} className={`${style.carrusel} ${showCarrusel ? style.animate : ''}`}>
            <div className={style.box}>
          <Link to="/iluminacion">
                <h4>Iluminacion</h4>
                <div className={style.boxImg}>
                    <img src="iluminacion2.jpeg" alt="imagen luz led" />
                </div>
          </Link>
            </div>
            <div className={style.box}>
          <Link to="/audio">
                <h4>Audio</h4>
                <div className={style.boxImg}>
                    <img src="parlante1.jpeg" alt="parlante audio" />
                </div>
          </Link>
            </div>
            <div className={style.box}>
          <Link to="/accesorios">
                <h4>Accesorios</h4>
                <div className={style.boxImg}>
                    <img src="creeled1.jpeg" alt="imagen toxicshine" />
                </div>
          </Link>
            </div>
            <div className={style.box}>
          <Link to="/seguridad">
              <h4>Seguridad</h4>
              <div className={style.boxImg}>
                  <img src="seguridad1.jpeg" alt="imagen cierre centralizado" />
              </div>
          </Link> 
          </div>
        </div>
    </div>
  );
};

export default SubHeader;
