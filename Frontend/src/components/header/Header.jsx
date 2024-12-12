import { useEffect, useState } from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {

  const images = [
    "imagen1.png",
    "imagen2.png",
    "imagen3.png",
    "imagen4.png",
  ];
 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

    return (
      <div className={style.container}>
        <div className={style.texto}>
            <span className={style.somos}>Somos</span>
            <h1 className={style.textoEfecto}>ELECTROAUTO</h1>
            <h5>ACCESORIOS PARA SU VEHICULO</h5>
            <div className={style.visita}>
              <Link to="/tienda">
                <button>Visitá la tienda</button>
              </Link>
            </div>
        </div>
        <div className={style.carrusel}>
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className={style.carruselImage}
          />
      </div>
    </div>
  );
};

export default Header;
