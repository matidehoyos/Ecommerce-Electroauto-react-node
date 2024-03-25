import React, { useState } from 'react';
import style from './FormEnvio.module.css'
import preferenceProvider from '../../utils/provider/preferenceProvider';

export default function FormEnvio(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit(form);
      };

  const [form, setForm] = useState({
    provincia: '',
    postal: '',
    ciudad: '',
    calle: '',
    numeroCalle: '',
    numeroDepartamento: '',
    piso: '',
    observacion: ''
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Provincia:
        <input type="text" name="provincia" onChange={handleChange} />
      </label>
      <label>
        Codigo postal:
        <input type="text" name="postal" onChange={handleChange} />
      </label>
      <label>
        Ciudad:
        <input type="text" name="ciudad" onChange={handleChange} />
      </label>
      <label>
        Calle:
        <input type="text" name="calle" onChange={handleChange} />
      </label>
      <label>
        Número de calle:
        <input type="text" name="numeroCalle" onChange={handleChange} />
      </label>
      <label>
        Número de departamento:
        <input type="text" name="numeroDepartamento" onChange={handleChange} />
      </label>
      <label>
        Piso:
        <input type="text" name="piso" onChange={handleChange} />
      </label>
      <label>
        Observación:
        <textarea name="observacion" onChange={handleChange} />
      </label>
      <input type="submit" value="Enviar" />
    </form>
  );
}
