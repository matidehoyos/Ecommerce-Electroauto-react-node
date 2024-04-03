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
    

    return(
        <div className={style.container}>
            <div className={style.navPc}></div>
            <NavBar />
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
                <img src="../../../public/bgPosta2.jpeg" alt="loader" />
                : productos.map((producto, index) => (
                    <div key={index}>
                        <ProductoTiendaCard producto={producto}/>
                    </div>
                ))  }
            </div>
        </div>
    )
}


export default Tienda;