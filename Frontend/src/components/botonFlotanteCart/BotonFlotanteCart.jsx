
import Modal from "react-modal";
import { FaShoppingCart } from 'react-icons/fa';
import style from './BotonFlotanteCart.module.css'
import Carrito from '../../pages/carrito/Carrito';
import { useContext, useEffect, useState } from "react";
import CarritoContext from "../carritoContext/CarritoContext";


const BotonFlotanteCart = () => {
    Modal.setAppElement('#root');
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const bringData =  async () => {
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(carritoLocalStorage);
      }
  
      useEffect(() => {
        bringData();
      },[]);

  return (
    <div className={style.container}>
         <button className={style.kartButton} onClick={() => openModal()}><FaShoppingCart className={style.kartIcon}/><span className={style.cantidad}></span></button>


            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Carrito Modal"
            className={style.carritoModal}
            style={{
              overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
              },
              content: {
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'
              }
            }}
           >
            <div className={style.cerrarContainer}><button className={style.cerrarModal} onClick={closeModal}>X</button></div>    
            <Carrito />
            </Modal>

            </div>
);
}

export default BotonFlotanteCart