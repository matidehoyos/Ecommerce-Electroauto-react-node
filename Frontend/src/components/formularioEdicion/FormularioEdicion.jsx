import React, { useState } from 'react';
import style from './FormularioEdicion.module.css'
import productosProvider from '../../utils/provider/productosProvider';

const FormularioEdicion = ({ productoEditando, cerrarModal }) => {
  const [nombre, setNombre] = useState(productoEditando.name);
  const [detalle, setDetalle] = useState(productoEditando.detalle);
  const [informacion, setInformacion] = useState(productoEditando.informacion);
  const [precio, setPrecio] = useState(productoEditando.precio);
  const [stock, setStock] = useState(productoEditando.cantidad);
  const [categoria, setCategoria] = useState(productoEditando.categoria);
  const [imagen, setImagen] = useState(productoEditando.imagen);

  const handleImage = async (e) => {
    const imgFile = e.target.files[0];
    try {
      const { data } = await productosProvider.uploadImg(imgFile);
      setImagen(data.url);
    } catch (error) {
        console.error(error)
     }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const productoActualizado = {
            ...productoEditando,
            id: productoEditando.id,
            name: nombre,
            detalle,
            informacion,
            precio,
            categoria,
            cantidad: stock,
            imagen
          };
        const response = await productosProvider.putProducto(productoActualizado);
        if(response){
          alert(`Producto actualizado con exito`);
          cerrarModal();
        }} catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
};


  return (
    <div className={style.container}>
     <form onSubmit={handleSubmit}>
            <div className={style.row}>
                <label>Nombre: </label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className={style.row}>
                <label>Detalle:</label>
                <textarea type="text" value={detalle} onChange={e => setDetalle(e.target.value)} />
            </div>
            <div className={style.row}>
                <label>Info:</label>
                <textarea type="text" value={informacion} onChange={e => setInformacion(e.target.value)} />
            </div>
            <div className={style.row}>
                <label>Precio:   </label>
                <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
            </div>
            <div className={style.row}>
            <label>Categoria:</label>
                <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} />
            </div>
            <div className={style.row}>
                <label>Stock:  </label>
                <input type="text" value={stock} onChange={e => setStock(e.target.value)} />
            </div>
            <div className={style.row}>
                <label>Imagen:</label>
                <input type="file" onChange={handleImage} />
            </div>
            <div className={style.submit}>
               <button type="submit">Guardar cambios</button>
            </div>
        </form>
    </div>
    
  );
};

export default FormularioEdicion;
