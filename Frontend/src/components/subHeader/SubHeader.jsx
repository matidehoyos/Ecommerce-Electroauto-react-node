import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import style from './SubHeader.module.css'
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
            <h4>Algunos de nuestros productos</h4>
            <div className={style.cardsContainer}>
              <Populares />
            </div>
            <div className={style.linkTienda}>
                <button><Link to="/tienda">Encontrá más productos aqui</Link></button>
            </div>
        </div>
    </div>
  );
};

export default SubHeader;
