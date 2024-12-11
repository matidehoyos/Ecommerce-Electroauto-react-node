import style from './InfoEnvios.module.css'
import { FaTruck } from 'react-icons/fa';

const InfoEnvios = () => {

  return (
    <div className={style.container}>
          <div className={style.text}>
            <p><FaTruck /></p>
            <div className={style.first}>
              <h4>ENVIO GRATIS A TODO EL PAÍS</h4>
              <h5>CON TU COMPRA MAYOR A $90.000</h5>
            </div>
            <div className={style.firstMovil}>
              <h4>ENVIO GRATIS<br/>A TODO EL PAÍS</h4>
              <h5>CON TU COMPRA<br/>MAYOR A $90.000</h5>
            </div>
        </div>
    </div>
  );
};

export default InfoEnvios;