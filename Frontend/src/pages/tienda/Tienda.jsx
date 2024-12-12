import style from './Tienda.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import productosProvider from '../../utils/provider/productosProvider';
import { loadProductos } from '../../redux/actions';
import SearchBar from '../../components/searchBar/SearchBar';
import ProductCard from '../../components/productCard/ProductCard';
import Footer from '../../components/footer/Footer';

const Tienda = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [productos, setProductos] = useState([]);

  const bringData = async () => {
    const response = await productosProvider.getProductos();
    dispatch(loadProductos(response.data));
    setProductos(response.data);
  };

  useEffect(() => {
    bringData();
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
              <ProductCard key={index} producto={producto} />
          ))
        ) : (
          <div className={style.loader}>
            <img src="ELECT.png" alt="logo" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Tienda;

