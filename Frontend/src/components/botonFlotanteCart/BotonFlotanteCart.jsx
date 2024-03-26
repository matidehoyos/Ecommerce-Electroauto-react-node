import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import CarritoContext from '../../components/carritoContext/CarritoContext';
import style from './BotonFlotanteCart.module.css'
//import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

const credMp = 'TEST-f3c67e82-99f3-485b-9002-d216c9a4f7db'

const BotonFlotanteCart = () => {
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);
    const [user,setUser] = useState([]);

     useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user')) || [];
        setUser(userLocalStorage);
    }, []);

    {/*useEffect(() => {
        initMercadoPago(credMp, { locale: 'es-AR' });
      }, []); */ }
    
    const createPreference = async () => {
        try {
            const response = await axios.post('/createPreferenceId', {email: user.email})
            const { id } = response.data; 
            return id;
        } catch (error) {
            console.error(error);
        }}

        const eliminarDelCarrito = (idProducto) => {
          const nuevoCarrito = carrito.filter(producto => producto.id !== idProducto);
          localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
          setCarrito(nuevoCarrito);
      }
  
  
      const handleBuy = async () => {
          const id = await createPreference(); 
          if (id) {
              setPreferenceId(id);
          }
      }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const total = carrito.reduce((total, producto) => total + producto.unidades * producto.precio, 0);

    return (
        <div className={style.modalCarrito}>
            <button className={style.kartButton} onClick={openModal}><FaShoppingCart /></button>
          
                            
        </div>
    );
};

export default BotonFlotanteCart;
