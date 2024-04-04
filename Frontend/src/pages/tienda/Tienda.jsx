import { useDispatch  } from 'react-redux';
import NavBar from '../../components/navBar/NavBar';
import style from './Tienda.module.css'
import ProductoTiendaCard from '../../components/productoTiendaCard/ProductoTiendaCard';
import productosProvider from '../../utils/provider/productosProvider';
import { loadProductos } from '../../redux/actions';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import { useNavigate } from 'react-router';


const Tienda = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [productos, setProductos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;

    const bringData = async () => {
        const response = await productosProvider.getProductos();
        dispatch(loadProductos(response.data));
        setProductos(response.data);
    }

    useEffect(() => {
        bringData();
        setLoader(false)
    }, []); 

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
                    <div key={index}>
                        <ProductoTiendaCard producto={producto}/>
                    </div>
                )) 
                : <div className={style.loader}>
                    <img src="ELECT.png" alt="logo" />
                 </div> } 
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


export default Tienda;
