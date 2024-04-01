import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
 

    
    return (
      <div className={style.container}>
        <div className={style.texto}>
          <span>Somos</span>
            <h1>ELECTROAUTO</h1>
            <h5 className={style.textoEfecto}>
            <span style={{'--i': 1}}>A</span><span style={{'--i': 2}}>C</span><span style={{'--i': 3}}>C</span>
            <span style={{'--i': 4}}>E</span>
            <span style={{'--i': 5}}>S</span>
            <span style={{'--i': 6}}>O</span>
            <span style={{'--i': 7}}>R</span>
            <span style={{'--i': 7}}>I</span>
            <span style={{'--i': 8}}>O</span>
            <span style={{'--i': 9}}>S</span>
            <span style={{'--i': 10}}> </span>
            <span style={{'--i': 11}}>P</span>
            <span style={{'--i': 12}}>A</span>
            <span style={{'--i': 13}}>R</span>
            <span style={{'--i': 14}}>A</span>
            <span style={{'--i': 15}}> </span>
            <span style={{'--i': 16}}>T</span>
            <span style={{'--i': 17}}>U</span>
            <span style={{'--i': 18}}> </span>
            <span style={{'--i': 19}}>V</span>
            <span style={{'--i': 20}}>E</span>
            <span style={{'--i': 21}}>H</span>
            <span style={{'--i': 22}}>I</span>
            <span style={{'--i': 23}}>C</span>
            <span style={{'--i': 24}}>U</span>
            <span style={{'--i': 25}}>L</span>
            <span style={{'--i': 26}}>O</span>
            </h5>
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
