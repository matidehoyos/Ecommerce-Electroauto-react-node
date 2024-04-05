import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productosProvider from "../../utils/provider/productosProvider";
import style from './Productos.module.css'
import PreNav from "../preNav/PreNav";
import ProductoTiendaCard from "../productoTiendaCard/ProductoTiendaCard";
import NavBar from "../navBar/NavBar";
import { FaShoppingBasket, FaStore } from 'react-icons/fa';
import SearchBar from "../searchBar/SearchBar";


export default function Productos() {
    const navigate = useNavigate();
    const { nombre } = useParams();
    const [productos, setProductos] = useState([]);
    const [loader, setLoader] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;
    
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
        setLoader(false)
    }, [nombre]);

    const handleClick = () => {
        navigate("/tienda");
    }

    const handleFilter = (e) => {
        e.preventDefault();
        navigate(`/${e.target.value}`);
      }

      const productosActuales = productos.slice((paginaActual - 1) * productosPorPagina, paginaActual * productosPorPagina);


    return(
        <div className={style.container}>
        <div className={style.navPc}>
            <NavBar />
        </div>
            <div className={style.header}>
                    <NavBar />
                    <div className={style.search}>
                        <SearchBar />
                    </div>
                    <div className={style.filters}>
                            <button onClick={handleFilter} value={"tienda"}>Todos</button>
                            <button onClick={handleFilter} value={"accesorios"}>Accesorios</button>
                            <button onClick={handleFilter} value={"iluminacion"}>Iluminacion</button>
                            <button onClick={handleFilter} value={"audio"}>Audio</button>
                            <button onClick={handleFilter} value={"seguridad"}>Seguridad</button>
                    </div>
            </div>
            <div className={style.cardsContainer}>
                { 
                loader ?
                <div className={style.loader}>
                    <img src="ELECT.png" alt="logo" />
                </div>
                : productosActuales.length ?
                productosActuales.map((producto, index) => (
                    <div key={index} className={style.card}>
                        <ProductoTiendaCard producto={producto}/>
                    </div> ))       
                :  (<div className={style.loader}>
                    <img src="ELECT.png" alt="logo" />
                 </div> )
                }
            </div>
            <div className={style.pagination}>
                {[...Array(Math.ceil(productos.length / productosPorPagina)).keys()].map(num => (
                    <button key={num} onClick={() => setPaginaActual(num + 1)}>
                        {num + 1}
                    </button>
                ))}
                 </div>
        </div>
    )
}
