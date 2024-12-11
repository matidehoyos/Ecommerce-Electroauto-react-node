import style from './Productos.module.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productosProvider from "../../utils/provider/productosProvider";
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import ProductoTiendaCard from "../productoTiendaCard/ProductoTiendaCard";
import ProductCard from '../productCard/ProductCard';


export default function Productos() {
    const navigate = useNavigate();
    const { nombre } = useParams();
    const [productos, setProductos] = useState([]);
    const [loader, setLoader] = useState(true);
    
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

    const handleFilter = (e) => {
        e.preventDefault();
        navigate(`/${e.target.value}`);
      }



    return(
        <div className={style.container}>
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
                : productos.length ?
                productos.map((producto, index) => (
                        <ProductCard key={index} producto={producto}/>
                     ))       
                :  (<div className={style.loader}>
                    <img src="ELECT.png" alt="logo" />
                 </div> )
                }
            </div>
        </div>
    )
}
