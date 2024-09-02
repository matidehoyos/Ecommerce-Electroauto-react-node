import React, { useState } from 'react';
import style from './CreateCategory.module.css';
import categoriasProvider from '../../../utils/provider/categoriasProvider';

const CreateCategory = () => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name) {
        const response = await categoriasProvider.postCategoria(name); 
        if (response.data) {
        alert('Categoria creada con exito!!')
        setName('');
        }
      }
    } catch (error) {
      alert('Error al crear categoria:', error);
    }
  };


  return (
    <div className={style.container}>
      <div className={style.subcontainer}>
        <h3>Crear nueva categoria</h3>
        <form onSubmit={handleSubmit}>
          <div className={style.row}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Escriba aqui el nombre"
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.submit}>
            <button className={style.formButton} type="submit">
              Crear Categoria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
