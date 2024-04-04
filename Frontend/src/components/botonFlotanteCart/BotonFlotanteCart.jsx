import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import {  FaTrashAlt } from 'react-icons/fa';
import CarritoContext from '../../components/carritoContext/CarritoContext';
import style from './BotonFlotanteCart.module.css'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import preferenceProvider from '../../utils/provider/preferenceProvider';
import LoginButton from '../loginButton/LoginButton';
import FormularioEnvio from '../formularioEnvio/FormularioEnvio'
import { IoCartOutline } from 'react-icons/io5';


const BotonFlotanteCart = () => {
    const { carrito, setCarrito } = useContext(CarritoContext);
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [preferenceId, setPreferenceId] = useState('');
    const [user,setUser] = useState([]);
    const total = carrito.reduce((total, producto) => total + producto.unidades * producto.precio, 0);
    const [estadoEnvio, setEstadoEnvio] = useState(null);
    const [formDataEnvio, setFormDataEnvio] = useState({
        localidad: '',
        codigoPostal: '',
        provincia: '',
        calle: '',
        numero: '',
        piso: '',
        departamento: '',
        observaciones: ''
      });

    
    initMercadoPago('TEST-f3c67e82-99f3-485b-9002-d216c9a4f7db', { locale: 'es-AR' });

     useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user')) || [];
        setUser(userLocalStorage);
    }, []);
    
    
    const createPreference = async () => {
        try {
            let items = carrito.map(producto => {
                return {
                    title: producto.name,
                    quantity: Number(producto.unidades),
                    unit_price: Number(producto.precio)
                };
            });
            const obj = {
                items:  items,
                email: user.email
            }
            const id = await preferenceProvider.createPreference(obj);
            return id;
        } catch (error) {
            console.log(error)
            console.error(error);
        }}

        const eliminarDelCarrito = (idProducto) => {
          const nuevoCarrito = carrito.filter(producto => producto.id !== idProducto);
          localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
          setCarrito(nuevoCarrito);
      }
  
      
      const handleBuy = async () => {
        try {
          const id = await createPreference(); 
          if (id) {
            setPreferenceId(id);
          } } catch (error) {
            console.log(error)
            console.error(error)
        }
      }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const enviarFormEnvioData = async () => {
        try {
            await preferenceProvider.updateDatosEnvio({preferenceId, formDataEnvio});
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={style.modalCarrito}>
            {
                carrito.length > 0 ?
                <button className={style.kartButton} style={{ display: modalIsOpen ? 'none' : 'block' }}  onClick={openModal}><IoCartOutline className={style.iconC}/><span>{carrito.length > 0 ? carrito.length : null}</span></button>
                : null
            }
            <div>
            <Modal
                className={style.modal}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Carrito Modal"
                style={{
                overlay: {
                    background: 'rgba(0,0,0,.6)',
                    backdropFilter: 'blur(5px)'
                },
                }}
             >
                <div className={style.buttonContainer}> 
                  <button  className={style.botonCierre} onClick={closeModal}>x</button>
                </div>
                <h4 className={style.tituCart}>Tus productos seleccionados</h4>
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
                          : <div className={style.noLoggedContainer}>
                             <p className={style.noLogged}>Debes iniciar sesion para procesar la compra.</p>
                             <LoginButton />
                            </div>
                        }
        
                        { preferenceId && 
                                <div className={style.formDataEnvio}>
                                    <FormularioEnvio formDataEnvio={formDataEnvio} setFormDataEnvio={setFormDataEnvio} estadoEnvio={estadoEnvio} setEstadoEnvio={setEstadoEnvio} enviarFormEnvioData={enviarFormEnvioData}  />
                                </div>
                        }
                            
                        { estadoEnvio === 'exito' ?
                            <div className={style.wallet}>
                                 <Wallet initialization={{preferenceId: preferenceId}} customization={{ texts: { valueProp: 'smart_option' }, visual: {horizontalPadding:'0px', buttonHeight: '55px' } }}  />
                            </div> 
                            : null
                        }     
                </div>
            </Modal> 

        </div>                     
    </div>
    );
};

export default BotonFlotanteCart;
