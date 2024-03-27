import { useEffect, useState, useRef } from 'react';
import style from './AboutUs.module.css'
import { MdLocationOn } from 'react-icons/md';
import { FaTruck, FaCheck } from 'react-icons/fa';
import { FaCcMastercard } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

const AboutUs = () => {
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      const topPos = (element) => element.getBoundingClientRect().top;
      const pos = topPos(containerRef.current);

      if (!show && window.scrollY > (pos + 1200)) {
        setShow(true);
      } else if (show && window.scrollY <= pos) {
        setShow(false);
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [show]);

  return (
    <div ref={containerRef} className={`${style.container} ${show ? style.animate : ''}`}> 
          <div className={style.mercadoLibre}>
            <div className={style.imgML}>
                <img src="ml.png" alt="mercadolibre" />
            </div>
            <div className={style.mercadoTexto}>
                <span>SOMOS</span>
                <h3>MERCADO LIBRE <br/> LIDER PLATINIUM</h3>
                <h6>COMPRA CON CONFIANZA</h6>
                <p><FaCheck className={style.ico}/>MAS DE 10 MIL VENTAS</p>
                <p><FaCheck className={style.ico}/>MAS DE 10 AÑOS DE EXPERIENCIA</p>
            </div>
        </div>
        <div className={style.texto}>
            <h5>Estamos en Mar Del Plata</h5>
            <p><MdLocationOn /> Magallanes 4394</p>
            <p><FaTruck /> Envios a todo el pais</p>
            <p><FaCcMastercard /> Todos los medios de pago</p>
            <p><FaLock /> Compra 100% segura</p>
        </div>      
        <div className={style.mapa}>
           <iframe className={style.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4541279362948!2d-57.55942868820136!3d-38.036503546684266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de793ab6b611%3A0x9231325eddac25aa!2sMagallanes%204394%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710183187034!5m2!1ses!2sar" width="670" height="300" style={{border:0}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
           <iframe className={style.mapita} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4541279362948!2d-57.55942868820136!3d-38.036503546684266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de793ab6b611%3A0x9231325eddac25aa!2sMagallanes%204394%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710183187034!5m2!1ses!2sar" width="300" height="300" style={{border:0}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default AboutUs;
