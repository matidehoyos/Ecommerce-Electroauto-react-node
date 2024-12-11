import style from "./Contact.module.css";
import { useState } from "react";
import mensajesProvider from "../../utils/provider/mensajesProvider";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mensaje: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formSubmit = async(event) => {
    event.preventDefault();
    try {
      await mensajesProvider.postMensajes(formData);
      setFormData({
        name: '',
        email: '',
        mensaje: ''
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.subcontainer}>
        <div className={style.titulo}>
          <h3>Contactanos</h3>
        </div>
        <div className={style.mediosContacto}>
          <div className={style.form}>
            <form >
              <div className={style.row}>
                  <label htmlFor="name">Nombre:</label>
                  <input id="name" type="text" name="name" value={formData.name} placeholder="Escriba aqui su nombre" onChange={handleChange}/>
              </div>
              <div className={style.row}>
                  <label htmlFor="email">Email:</label>
                  <input id="email" type="email" name="email" value={formData.email} placeholder="Escribe aqui su email" onChange={handleChange}/>
              </div>
              <div className={style.row}>
                  <label htmlFor="email">Mensaje:</label>
                  <textarea id="message" name="mensaje" value={formData.mensaje} placeholder="Escriba aqui su mensaje" onChange={handleChange}/>
              </div>    
              <div className={style.botonContainer}>
                <button onClick={formSubmit}>Enviar mensaje</button>
              </div>
            </form>
          </div>
          <div className={style.wts}>
            <div className={style.wtsTexto}>
              <h4>O envianos un WhatsApp</h4>
              <a href="https://api.whatsapp.com/send?phone=542235448523" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className={style.icon} />+54 9 2235 448523
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;