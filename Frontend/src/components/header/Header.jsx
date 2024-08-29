import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
 

    
    return (
      <div className={style.container}>
        <div className={style.div}></div>
        <div className={style.landing}>
          <img src='logoPc.png' alt="logo" />
        </div>
        <div className={style.texto}>
          <span className={style.somos}>Somos</span>
            <h1 className={style.textoEfecto}><span style={{'--i': 1}}>E</span><span style={{'--i': 2}}>L</span><span style={{'--i': 3}}>E</span><span style={{'--i': 4}}>C</span><span style={{'--i': 5}}>T</span><span style={{'--i': 6}}>R</span><span style={{'--i': 7}}>O</span><span style={{'--i': 7}}>A</span><span style={{'--i': 8}}>U</span><span style={{'--i': 9}}>T</span><span style={{'--i': 10}}>O</span></h1>
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
        </div>
    </div>
  );
};

export default Header;
