import React, { useState } from 'react';
import style from './FormularioEnvio.module.css';

const FormularioEnvio = ({formDataEnvio, setFormDataEnvio, estadoEnvio, setEstadoEnvio,  enviarFormEnvioData }) => {
  

  const handleChange = (event) => {
    setFormDataEnvio({
      ...formDataEnvio,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      enviarFormEnvioData();
      setEstadoEnvio('exito');
  };

  return (
    <div className={style.container}>
        <h4>Complete los siguientes datos para su envio</h4>
        <form onSubmit={handleSubmit}>
            <input className={style.entero} type="text" name="localidad" placeholder="Localidad:" value={formDataEnvio.localidad} onChange={handleChange} />
            <input className={style.entero} type="text" name="provincia" placeholder="Provincia:" value={formDataEnvio.provincia} onChange={handleChange} />
            <input className={style.entero} type="text" name="calle" placeholder="Calle:" value={formDataEnvio.calle} onChange={handleChange} />
            <input className={style.medio} type="text" name="numero" placeholder="Número:" value={formDataEnvio.numero} onChange={handleChange} />
            <input className={style.medio} type="text" name="codigoPostal" placeholder="Codigo postal:" value={formDataEnvio.codigoPostal} onChange={handleChange} />
            <input className={style.medio} type="text" name="piso" placeholder="Piso:" value={formDataEnvio.piso} onChange={handleChange} />
            <input className={style.medio} type="text" name="departamento" placeholder="Departamento:" value={formDataEnvio.departamento} onChange={handleChange} />
            <textarea className={style.entero} type="text" name="observaciones" placeholder="Observaciones:" value={formDataEnvio.observaciones} onChange={handleChange} />
        <button type="submit">Enviar información</button>
        </form>
        {
          estadoEnvio === 'exito' ?
          <p className={style.respForm}>Datos enviados con exito!</p>
          : null
        }
        {
          estadoEnvio === '' && estadoEnvio !== 'exito' ?
          <p className={style.respForm}>Error al enviar, verifique los datos.</p>
          : null
        }
    </div>
  );
};

export default FormularioEnvio;
