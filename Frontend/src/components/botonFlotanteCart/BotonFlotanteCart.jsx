import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import CarritoContext from '../../components/carritoContext/CarritoContext';
import style from './BotonFlotanteCart.module.css'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import preferenceProvider from '../../utils/provider/preferenceProvider';


const BotonFlotanteCart = () => {
    const { carrito, setCarrito } = useContext(CarritoContext);
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [preferenceId, setPreferenceId] = useState('');
    const [user,setUser] = useState([]);
    
    initMercadoPago('TEST-f3c67e82-99f3-485b-9002-d216c9a4f7db', { locale: 'es-AR' });

     useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user')) || [];
        setUser(userLocalStorage);
    }, []);
    
    
    const createPreference = async () => {
        try {
            const obj = {
                items: carrito,
                email: user.email
            }
            const response = await preferenceProvider.createPreference(obj)
            console.log(response)
            const { id } = response; 
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
          console.log(id)
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
            <button className={style.kartButton} style={{ display: modalIsOpen ? 'none' : 'block' }}  onClick={openModal}><FaShoppingCart /><span>{carrito.length}</span></button>
            <div>
            <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Carrito Modal"
    style={{
      overlay: {
        backgroundImage: 'linear-gradient(to right , #e7ef00, #fcffa9)',
          backdropFilter: 'blur(5px)'
      },
      content: {
          width: '94vw',
          minHeight: 'auto', 
          margin: '0 auto',
          marginTop: '0',
          border: 'none',
          background: 'rgba(256,256,256,1',
          boxShadow: '0px 0px 20px rgba(0,0,0,.7)',
          overflow: 'scroll',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '6px',
          outline: 'none',
          padding: '0px',
          paddingBottom: '26px',
          position: 'relative',
          left: '0vw',
          top: '90px',
        }
      }}
>
                 <div className={style.buttonContainer}> 
                  <button  className={style.botonCierre} onClick={closeModal}>x</button>
                </div>
                <h4 className={style.tituCart}>Tus productos seleccionados: </h4>
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
                                <td className={style.cellName}>{producto.name}</td>
                                <td className={style.cell}>{producto.unidades}</td>
                                <td className={style.cell}>${producto.precio}</td>
                                <td className={style.cell}>${producto.subtotal}</td>
                                <td className={style.cell}><button onClick={() => eliminarDelCarrito(producto.id)} className={style.tarro}><FaTrashAlt/></button></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className={style.totalLabel}>Total:</td>
                            <td className={style.totalValue}>${total}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={style.proceso}>                 
                            { user.email ?
                         <button onClick={handleBuy} className={user.name ? style.botonProcesar : style.disabledProcesar} disabled={!user.name} >Procesar compra</button>
                          :  <p className={style.noLogged}>Debes iniciar sesion para prosesar la compra.</p>
                           }
        
                           { preferenceId && (
                               <div className={style.wallet}>
                                 <Wallet initialization={{preferenceId: preferenceId}} 
                                           customization={{ texts: { valueProp: 'smart_option' }, visual: {horizontalPadding:'0px', buttonHeight: '55px' } }}  />
                                </div> 
                         ) } 
                    </div>
            </Modal> 

            </div>
                            
        </div>
    );
};

export default BotonFlotanteCart;
