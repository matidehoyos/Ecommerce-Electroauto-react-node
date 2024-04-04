import style from './Footer.module.css'
import { Link } from 'react-router-dom'
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from 'react-icons/fa';
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowUp } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Subject of email',
          html: 'HTML content of email',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

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
            <form onSubmit={handleSubmit}>
              <label htmlFor="">Recibi nuestras novedades</label>
              <input
                type="email"
                placeholder="Ingresa aqui tu email..."
                value={email}
                onChange={handleEmailChange}
              />
              <button type="submit">Suscribite!</button>
            </form>
        </div>

      </div>
      <footer>Todos los derechos reservados. Sitio desarrollado por </footer>
    </div>
  )
}

export default Footer
