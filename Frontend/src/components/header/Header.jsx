import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
 

    
    return (
      <div className={style.container}>
        <div className={style.texto}>
          <span>Somos</span>
            <h1>ELECTROAUTO</h1>
            <h5>ACCESORIOS PARA TU VEHICULO</h5>
            <div className={style.envios}>
              <h6>ENVIOS A TODO EL PAÍS</h6>
              <h6 className={style.mayor}>MAYORISTA Y MINORISTA</h6>
            </div>
            <div className={style.visita}>
              <Link to="/tienda">
                <button>Visitá la tienda</button>
              </Link>
            </div>
            <img className={style.headerImg} src="../../../public/BKM.png" alt="logo" />
        </div>
    </div>
  );
};

export default Header;
