
import { useContext, useState } from "react";
import style from "./ProductoTiendaCard.module.css";
import Modal from 'react-modal';
import CarritoContext from "../carritoContext/CarritoContext";

const ProductoTiendaCard = ({producto}) => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const [unidades, setUnidades] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const subtotal = unidades * producto.precio;

  const handleChange = (e) => {
      const value = e.target.value;
      setUnidades(value);
  }

  const agregarAlCarrito = async () => {
    const productoCarrito = {
      id: producto.id,
      name: producto.name,
      imagen: producto.imagen,
      unidades: unidades,
      subtotal: subtotal,
      precio: producto.precio,
    }
  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    carrito.push(productoCarrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    setCarrito(carrito);
  }

  const nombreProducto = producto?.name.toUpperCase();

  return (
      <div className={style.container}>
        <div onClick={() => setModalIsOpen(true)} className={style.link}> 
          <div className={style.imgContainer}>
            <img src={producto.imagen} alt={producto.name}/>
          </div>   
          <h3>{nombreProducto}</h3>
          <p className={style.detalle}>{producto.detalle}</p> 
          <p className={style.precio}><span className={style.precioNumero}>${producto.precio}</span></p>  
        </div> 
        <Modal 
        className={style.modal}
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            background: 'rgba(0,0,0,.6)',
              backdropFilter: 'blur(5px)'
          }
          }}
        >
          <div className={style.cerrarModalMobile}>
              <button  onClick={() => setModalIsOpen(false)}>X</button>
          </div>
          <div className={style.imag}>
            <img className={style.imgModal} src={producto.imagen} alt={producto.name}/>
          </div>
          <div className={style.txtDetalle}>
              <div className={style.cerrarModal}>
                 <button  onClick={() => setModalIsOpen(false)}>X</button>
              </div>
              <h2 className={style.nameM}>{producto.name}</h2>
              <p className={style.detalleM}>{producto.detalle}</p>
              <p className={style.infoM}>{producto.informacion}</p>
              <p className={style.precioM}>${producto.precio}</p>
              <p className={style.stock}>Stock disponible: <span>{producto.cantidad}</span></p>
              <div className={style.unidadesM}>
                    <select onChange={handleChange}>
                  {[...Array(20).keys()].map((value, index) => 
                <option key={index} value={value + 1}>
                  {value + 1} {value === 0 ? 'unidad' : 'unidades'}
                </option>
              )}
                  </select> 
                  <button  className={style.addCartM}  onClick={agregarAlCarrito}>Agregar al carrito</button>
              </div>
          </div>
          
        </Modal>
      </div>
  );
};

export default ProductoTiendaCard;