import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productosProvider from "../../utils/provider/productosProvider";
import style from './Productos.module.css'
import PreNav from "../preNav/PreNav";
import ProductoTiendaCard from "../productoTiendaCard/ProductoTiendaCard";
import NavBar from "../navBar/NavBar";
import { FaShoppingBasket, FaStore } from 'react-icons/fa';


export default function Productos() {
    const navigate = useNavigate();
    const { nombre } = useParams();
    const [productos, setProductos] = useState([]);
    
    const bringData = async () => {
            try {
                const response = await productosProvider.getProductoByName(nombre);
                if (Array.isArray(response)) {
                    setProductos(response);
                } else {
                    setProductos([]);
                }
            } catch (error) {
                console.error(error);
            }
        }

    useEffect(() => {
        bringData();
    }, [nombre]);

    const handleClick = () => {
        navigate("/tienda");
    }

    return(
        <div className={style.container}>
            <PreNav />
            <NavBar />
            <div className={style.cardsContainer}>
                { 
                productos.length ?
                productos.map((producto, index) => (
                    <div key={index}>
                        <ProductoTiendaCard producto={producto}/>
                    </div> ))       
                    :
                    (<div className={style.notFoundBox}>
                        <h3 className={style.productoNotFound}>AÚN NO HAY PRODUCTOS DE ESA CATEGORIA</h3>   
                        <button className={style.verTienda} onClick={handleClick}><FaShoppingBasket className={style.icon} />VER PRODUCTOS DISPONIBLES</button>
                    </div>)
                }
            </div>
        </div>
    )
}