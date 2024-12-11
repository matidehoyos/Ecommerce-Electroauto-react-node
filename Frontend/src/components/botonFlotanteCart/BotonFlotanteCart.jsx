import style from './BotonFlotanteCart.module.css';
import React, { useContext } from 'react';
import CarritoContext from '../../components/carritoContext/CarritoContext';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

const BotonFlotanteCart = () => {
    const { carrito } = useContext(CarritoContext);

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

