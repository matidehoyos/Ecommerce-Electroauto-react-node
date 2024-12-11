import style from './Footer.module.css'
import { Link } from 'react-router-dom'
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from 'react-icons/fa';
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {

  return (
    <div className={style.containerFooter}>
      <div className={style.footer}>

        <div className={style.footerNavigation}>
          <div className={style.link}>
            <a href="#" onClick={() => window.scrollTo(0, 0)}>Subir al header</a>
            <Link to={"/"}>¿Quienes somos?</Link>
            <Link to={"/"}>Preguntas frecuentes</Link>
            <Link to={"/contacto"}>Contactanos</Link>
          </div>
        </div>

        <div className={style.footerContact}>
          <div className={style.contact}>
            <p><IoLocationSharp className={style.icon} />Mar Del Plata-Argentina</p>
            <a href="mailto:electroauto@gmail.com" target='_blank' ><MdOutlineAlternateEmail className={style.icon} />electroauto@gmail.com</a>
            <a href="https://api.whatsapp.com/send?phone=542235448523" target='_blank'><FaWhatsapp  className={style.icon} />+54 9 2235 448523</a>
          </div>
        </div>

        <div className={style.footerSocial}>
          <span className={style.redesTexto}>Encontranos tambien en:</span>
          <div className={style.socials}>
            <a href="https://www.facebook.com/p/Electroauto-100062343590075/" target="_blank" rel="noopener noreferrer"><MdFacebook /></a>
            <a target="_blank" href='https://www.instagram.com/electroauto.lm/'><FaInstagram /></a>
            <Link to={"/"}><AiFillTwitterCircle /></Link>
          </div>
        </div>

        <div className={style.footerNewLetter}>
            <form>
              <label htmlFor="">Recibi nuestras novedades</label>
              <input
                type="email"
                placeholder="Ingresa aqui tu email..."
              />
              <button type="submit">Suscribite!</button>
            </form>
        </div>

      </div>
       <p className={style.dev}>Desarrollado por <a href="https://mododigital.vercel.app" target="_blank" rel="noopener noreferrer"><span className={style.modo}>MODO</span><span className={style.digi}>DIGITAL</span></a></p>
      </div>
  )
}

export default Footer
