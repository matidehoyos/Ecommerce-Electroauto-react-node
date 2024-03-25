import style from "./Header.module.css";

const Header = () => {
 

    
    return (
      <div className={style.container}>
        <div className={style.texto}>
            <h1>ELECTROAUTO</h1>
            <h5>ACCESORIOS PARA TU VEHICULO</h5>
            <div className={style.envios}>
              <h6>ENVIOS A TODO EL PAíS</h6>
            </div>
        </div>
    </div>
  );
};

export default Header;
