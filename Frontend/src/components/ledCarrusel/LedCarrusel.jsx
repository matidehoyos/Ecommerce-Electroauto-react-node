import { FaCheck } from 'react-icons/fa';
import style from './LedCarrusel.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

const LedCarrusel = () => {

  const image = [ { url: 'carru1.jpeg'},{ url: 'carru2.jpeg'},{ url: 'carru3.jpeg'},{ url: 'carru4.jpeg'},{ url: 'carru5.jpeg'},{ url: 'carru6.jpeg'},{ url: 'carru7.jpeg'},{ url: 'carru8.jpeg'},{ url: 'carru9.jpeg'},{ url: 'carru10.jpeg'},{ url: 'carru11.jpeg'}]
  
  const carouselSettings = {
    showArrows: false,
    showThumbs: false,
    showStatus: false,
    infiniteLoop: true,
  }

  return (
    <div className={style.containerCarrusel}>
                <Carousel {...carouselSettings} autoPlay={true} interval={500} infiniteLoop={true} className={style.carouselStyles} >
                  {
                    image.map((imagen, index) => (
                      <Link key={index} to='/iluminacion'>
                        <div  className={style.caja}>
                          <img className={style.carruImg} src={imagen.url} alt={`Image n${index}`} />
                        </div>
                      </Link>
                    ))
                  }
                </Carousel>

              <div className={style.mercadoLibre}>
                <div className={style.imgML}>
                    <img src="ml.png" alt="mercadolibre" />
                </div>
                <div className={style.mercadoTexto}>
                    <h4 className={style.titular}>MERCADO LIBRE <br/> LIDER PLATINIUM</h4>
                    <h6>COMPRA CON CONFIANZA</h6>
                    <p><FaCheck className={style.ico}/>MAS DE 10 MIL VENTAS</p>
                    <p><FaCheck className={style.ico}/>MAS DE 10 AÑOS DE EXPERIENCIA</p>
                </div>
            </div>
    </div>
  )
}

export default LedCarrusel;