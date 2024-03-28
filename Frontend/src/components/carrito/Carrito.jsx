import React, { useContext, useEffect, useState } from 'react';
import style from './Carrito.module.css'
import CarritoContext from '../carritoContext/CarritoContext';
import { Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';


const credMp = 'TEST-f3c67e82-99f3-485b-9002-d216c9a4f7db'



const Carrito = () => {
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [preferenceId, setPreferenceId] = useState(null);
    const [user,setUser] = useState([]);
    const total = carrito.reduce((total, producto) => total + producto.unidades * producto.precio, 0);


    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user')) || [];
        setUser(userLocalStorage);
    }, []);

    useEffect(() => {
        initMercadoPago(credMp, { locale: 'es-AR' });
      }, []);
    

    const createPreference = async () => {
        try {
            const response = await axios.post('/createPreferenceId', {email: user.email})
            const { id } = response.data; 
            return id;
        } catch (error) {
            console.error(error);
        } 

    
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

console.log('carrito', carrito)

    return (
        <div className={style.container}>
                  <h1>Esto es un test</h1>

             <div>
                <h3 className={style.titulo}>Tus productos seleccionados:</h3>
                 <div className={style.tablaCarrito}>
                    <table>
                        <thead>
                            <tr>
                                <th><h6>Nombre</h6></th>
                                <th><h6>Cant</h6></th>
                                <th><h6>Precio</h6></th>
                                <th><h6>Subtotal</h6></th> 
                                <th><h6><FaTrashAlt className={style.ico} /></h6></th>
                            </tr>
                        </thead>
                        <tbody>
                           { carrito.map((producto, index) => (
                                <tr key={index}>
                                    <td><h5>{producto.name}</h5></td>
                                    <td><p>{producto.unidades}</p></td>
                                    <td><p>${producto.precio}</p></td>
                                    <td><p>${producto.subtotal}</p></td> 
                                    <td><p><button className={!preferenceId ? style.botonEliminar : style.disabled} disabled={preferenceId} onClick={() => eliminarDelCarrito(producto.id)}><FaTrashAlt className={style.ico} /></button></p></td>
                                </tr>
                            ))}
                                <tr>
                                    <td colSpan="3"><h4 className={style.total}>Total:</h4></td>
                                    <td colSpan="2"><h3>${total}</h3></td>
                                </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className={style.proceso}>                 
                            { !user.email ?
                            <p className={style.noLogged}>Debes iniciar sesion para prosesar la compra. El registro de datos es seguro, solo recibiremos tu nombre e email 
                                 para enviarte los datos de la compra y que hagamos el seguimiento. Nosotros no accedemos a contraseñas y demas informacion.</p>
                            : null }
                        <button className={style.CarroButton} onClick={handleBuy}><span className={style.cantidad}>Procesar compra</span></button>
                            { preferenceId && ( 
                               <div className={style.wallet}>
                                 <Wallet initialization={{preferenceId: preferenceId}}  />
                                </div> 
                            )} 
                          <button className={user.name ? style.botonProcesar : style.disabledProcesar} disabled={!user.name} >Procesar compra</button>
                    </div>
                    
                    
                </div> 
                    :
                    <p className={style.carritoVacio}>No tienes productos seleccionados aún. <Link to='/tienda'>Visita la tienda</Link></p>
        </div>
    );
};
}
export default Carrito;
