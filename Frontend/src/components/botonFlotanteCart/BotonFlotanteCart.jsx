import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import CarritoContext from '../../components/carritoContext/CarritoContext';
import style from './BotonFlotanteCart.module.css';

const BotonFlotanteCart = () => {
    const { carrito } = useContext(CarritoContext);
    const total = carrito.reduce((total, producto) => total + producto.unidades * producto.precio, 0);

    return (
        <div className={style.modalCarrito}>
            {
                carrito.length > 0 ?
                <Link to="/kart" className={style.kartButton}>
                    <span className={style.prod}>Productos seleccionados</span>
                    <IoCartOutline className={style.iconC}/>
                    <span className={style.cant}>{carrito.length}</span>
                </Link>
                : null
            }
        </div>
    );
};

export default BotonFlotanteCart;

