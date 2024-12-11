import style from './ProductsHome.module.css'
import Destacados from '../destacados/Destacados';
import { Link } from 'react-router-dom'

const ProductsHome = () => {

  return (
    <div className={style.container}>
        <div className={style.populares}>
            <h4>Productos destacados</h4>
            <Destacados />
            <div className={style.linkTienda}>
                <button><Link to="/tienda">Encontrá más productos aqui</Link></button>
            </div>
        </div>
    </div>
  );
};

export default ProductsHome;
