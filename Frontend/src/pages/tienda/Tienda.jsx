import { useDispatch } from 'react-redux';
import style from './Tienda.module.css';
import productosProvider from '../../utils/provider/productosProvider';
import { loadProductos } from '../../redux/actions';
import { useEffect, useState } from 'react';
import ProductoTiendaCard from '../../components/productoTiendaCard/ProductoTiendaCard';
import SearchBar from '../../components/searchBar/SearchBar';
import { Navigate, useNavigate } from 'react-router';

const Tienda = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [productos, setProductos] = useState([]);

  const bringData = async () => {
    const response = await productosProvider.getProductos();
    dispatch(loadProductos(response.data));
    setProductos(response.data);
  };

  useEffect(() => {
    bringData();
    setLoader(false);
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    Navigate(`/${e.target.value}`);
  };

  return (
    <div className={style.container}> 
      <div className={style.header}>
        <div className={style.search}>
          <SearchBar />
        </div>
        <div className={style.filters}>
          <button onClick={handleFilter} value="tienda">Todos</button>
          <button onClick={handleFilter} value="accesorios">Accesorios</button>
          <button onClick={handleFilter} value="iluminacion">Iluminacion</button>
          <button onClick={handleFilter} value="audio">Audio</button>
          <button onClick={handleFilter} value="seguridad">Seguridad</button>
        </div>
      </div>
      <div className={style.cardsContainer}>
        {productos.length ? (
          productos.map((producto, index) => (
              <ProductoTiendaCard key={index} producto={producto} />
          ))
        ) : (
          <div className={style.loader}>
            <img src="ELECT.png" alt="logo" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tienda;

