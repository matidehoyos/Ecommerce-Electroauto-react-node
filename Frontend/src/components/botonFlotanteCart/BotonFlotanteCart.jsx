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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Carrito Modal"
                style={{
                  overlay: {
                      backgroundColor: 'rgba(256,256,256,.4)',
                      backdropFilter: 'blur(5px)'
                  },
                  content: {
                      width: 'calc(90vw - 40px)',
                      height: 'calc(100vh - 160px)', 
                      margin: '0',
                      marginTop: '60px', 
                      border: 'none',
                      background: 'rgba(256,256,256,1',
                      overflow: 'hidden',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '0px 20px',
                      position: 'relative',
                      left: '5vw'
                    }
                  }}
            >
                 <div className={style.buttonContainer}> 
                  <button  className={style.botonCierre} onClick={closeModal}>X</button>
                </div>
                <h4>Tus productos seleccionados: </h4>
                <table className={style.table}>
                    <thead>
                        <tr className={style.cabezal}>
                            <th className={style.header}>Prod</th>
                            <th className={style.header}>Cant</th>
                            <th className={style.header}>Precio</th>
                            <th className={style.header}>Subtotal</th>
                            <th className={style.header}><FaTrashAlt /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map((producto, index) => (
                            <tr key={index} className={style.row}>
                                <td className={style.cell}>{producto.name}</td>
                                <td className={style.cell}>{producto.unidades}</td>
                                <td className={style.cell}>${producto.precio}</td>
                                <td className={style.cell}>${producto.subtotal}</td>
                                <td className={style.cell}><button onClick={eliminarDelCarrito} className={style.tarro}><FaTrashAlt/></button></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className={style.totalLabel}>Total:</td>
                            <td className={style.totalValue}>${total}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={style.proceso}>                 
                            { !user.email ?
                            <p className={style.noLogged}>Debes iniciar sesion para prosesar la compra. El registro de datos es seguro, solo recibiremos tu nombre e email 
                                 para enviarte los datos de la compra y que hagamos el seguimiento. Nosotros no accedemos a contraseñas y demas informacion.</p>
                            : null }
                            { preferenceId && ( 
                        <button className={style.CarroButton} onClick={handleBuy}><span className={style.cantidad}>{carrito?.length}</span></button>
                            )}
                            {/* preferenceId && ( 
                               <div className={style.wallet}>
                                 <Wallet initialization={{preferenceId: preferenceId}}  />}
                                </div> 
                            ) */} 
                          <button className={user.name ? style.botonProcesar : style.disabledProcesar} disabled={!user.name} >Procesar compra</button>
                    </div>
            </Modal>
        </div>
    );
};

export default BotonFlotanteCart;
