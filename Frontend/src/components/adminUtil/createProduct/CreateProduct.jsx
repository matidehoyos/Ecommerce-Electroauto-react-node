import React, { useState } from 'react';
import productosProvider from '../../../utils/provider/productosProvider';
import style from './CreateProduct.module.css'

const CreateProducto = () => {
  const category = [ 'Seleccione una categoria' , 'Iluminacion', 'Audio', 'seguridad', 'Accesorios'];

  const [formData, setFormData] = useState({
    name: '',
    detalle: '',
    categoria: '',
    informacion: '',
    cantidad: '',
    imagen: '',
    precio: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    const imgFile = e.target.files[0];
    try {
      const { data } = await productosProvider.uploadImg(imgFile);
      setFormData({
        ...formData,
        imagen: data.url,
      });
    } catch (error) { }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await productosProvider.postProducto(formData);
      if(response.data) {
        alert(`Producto ${response.data.producto.name} creado con exito`)
         setFormData({
        name: '',
        detalle: '',
        informacion: '',
        categoria: '',
        cantidad: '',
        imagen: '',
        precio: ''
      });
      }
     
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.subcontainer}>
      <h3>Crear nuevo producto</h3>
      <form onSubmit={handleSubmit}>
        <div className={style.row}> 
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} placeholder="Escriba aqui el nombre" onChange={handleChange} required />
        </div>
        <div className={style.row}>
          <label htmlFor="detalle">Detalle:</label>
          <textarea id="detalle" name="detalle" value={formData.detalle} placeholder="Escriba aqui el detalle" onChange={handleChange} required />
        </div>
        <div className={style.row}>
          <label htmlFor="informacion">Información:</label>
          <textarea id="informacion" name="informacion" value={formData.informacion} placeholder="Escriba aqui la info completa" onChange={handleChange} required />
        </div>
        <div className={style.row}>
          <label htmlFor="categoria">Categoría:</label>
          <select type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required >
            {
               category.map((categoria, index) => (
                <option key={index}>{categoria}</option>
               ))
            } 
          </select>
        </div>
        <div className={style.row}>
          <label htmlFor="cantidad">Stock:</label>
          <input type="number" id="cantidad" name="cantidad" placeholder="Escriba aqui cantidad en stock" value={formData.cantidad} onChange={handleChange} required />
        </div>
        <div>
        <div className={style.row}>
          <label>Imagen: </label>
          <input type="file"  name="imagen" onChange={handleImage} />
        </div>
        <div className={style.row}>
          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" name="precio" placeholder='Escriba aqui el precio' value={formData.precio} onChange={handleChange} required />
        </div>
        </div>
        <div className={style.submit}>
          <button className={style.formButton} type="submit">Crear Producto</button>
        </div>
      </form>
      </div>
    </div>
  );
}; 

export default CreateProducto;
