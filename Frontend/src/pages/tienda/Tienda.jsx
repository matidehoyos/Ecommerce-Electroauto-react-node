import { useDispatch  } from 'react-redux';
import NavBar from '../../components/navBar/NavBar';
import style from './Tienda.module.css'
import ProductoTiendaCard from '../../components/productoTiendaCard/ProductoTiendaCard';
import productosProvider from '../../utils/provider/productosProvider';
import { loadProductos } from '../../redux/actions';
import { useEffect, useState } from 'react';
import PreNav from '../../components/preNav/PreNav';
import SearchBar from '../../components/searchBar/SearchBar';


const Tienda = () => {
    const dispatch = useDispatch();
    const [productos, setProductos] = useState([]);

    const bringData = async () => {
        const response = await productosProvider.getProductos();
        dispatch(loadProductos(response.data));
        setProductos(response.data);
    }

    useEffect(() => {
        bringData();
    }, []); 

    return(
        <div className={style.container}>
            <PreNav />
            <NavBar />
            <div className={style.cardsContainer}>
                <SearchBar />
                {
                productos ?
                productos.map((producto, index) => (
                    <div key={index}>
                        <ProductoTiendaCard producto={producto}/>
                    </div>
                )) :
                "No se encontraron productos"
                }
            </div>
        </div>
    )
}


export default Tienda;