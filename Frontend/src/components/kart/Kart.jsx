import React, { useContext, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CarritoContext from '../../components/carritoContext/CarritoContext';
import style from './Kart.module.css';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import preferenceProvider from '../../utils/provider/preferenceProvider';
import LoginButton from '../loginButton/LoginButton';
import FormularioEnvio from '../formularioEnvio/FormularioEnvio';
import NavBar from '../navBar/NavBar';
import SearchBar from '../searchBar/SearchBar';

const Kart = () => {
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [preferenceId, setPreferenceId] = useState('');
    const [user, setUser] = useState([]);
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
                items: items,
                email: user.email
            };
            const id = await preferenceProvider.createPreference(obj);
            return id;
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarDelCarrito = (idProducto) => {
        const nuevoCarrito = carrito.filter(producto => producto.id !== idProducto);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        setCarrito(nuevoCarrito);
    };

    const handleBuy = async () => {
        try {
            const id = await createPreference();
            if (id) {
                setPreferenceId(id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const enviarFormEnvioData = async () => {
        try {
            await preferenceProvider.updateDatosEnvio({ preferenceId, formDataEnvio });
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        navigate(`/${e.target.value}`);
      };

      const agruparProductos = (carrito) => {
        const productosAgrupados = carrito.reduce((acc, producto) => {
            const existingProduct = acc.find(item => item.id === producto.id);
            if (existingProduct) {
                existingProduct.unidades += producto.unidades;
                existingProduct.subtotal += producto.unidades * producto.precio;
            } else {
                acc.push({ ...producto, subtotal: producto.unidades * producto.precio });
            }
            return acc;
        }, []);
        return productosAgrupados;
    };

    const carritoAgrupado = agruparProductos(carrito);

    return (
        <div className={style.kart}>
            <div className={style.navPc}>
                 <NavBar />
            </div>
            <h4 className={style.tituCart}>Tus productos seleccionados</h4>
            <table className={style.table}>
                <thead>
                    <tr >
                        <th className={style.hprod}>Producto</th>
                        <th className={style.head}>Cant</th>
                        <th className={style.head}>Precio</th>
                        <th className={style.head}>Subtotal</th>
                        <th className={style.head}><FaTrashAlt /></th>
                    </tr>
                </thead>
                <tbody>
                    {carritoAgrupado.map((producto, index) => (
                        <tr key={index} className={style.row}>
                            <td className={style.cellName}>{producto.name}</td>
                            <td className={style.cell}>{producto.unidades}</td>
                            <td className={style.cell}>${producto.precio}</td>
                            <td className={style.cell}>${producto.subtotal}</td>
                            <td className={style.cell}><button onClick={() => eliminarDelCarrito(producto.id)} className={style.tarro}><FaTrashAlt /></button></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3" className={style.totalLabel}>Total:</td>
                        <td className={style.totalValue}>${total}</td>
                    </tr>
                </tbody>
            </table>
            <div className={style.proceso}>
                {user.email ?
                    <button onClick={handleBuy} className={user.name ? style.botonProcesar : style.disabledProcesar} disabled={!user.name}>Procesar compra</button>
                    : <div className={style.noLoggedContainer}>
                        <p className={style.noLogged}>Debes iniciar sesión para procesar la compra.</p>
                        <LoginButton />
                    </div>
                }
                {preferenceId &&
                    <div className={style.formDataEnvio}>
                        <FormularioEnvio formDataEnvio={formDataEnvio} setFormDataEnvio={setFormDataEnvio} estadoEnvio={estadoEnvio} setEstadoEnvio={setEstadoEnvio} enviarFormEnvioData={enviarFormEnvioData} />
                    </div>
                }
                {estadoEnvio === 'exito' &&
                    <div className={style.wallet}>
                        <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' }, visual: { horizontalPadding: '0px', buttonHeight: '55px' } }} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Kart;
