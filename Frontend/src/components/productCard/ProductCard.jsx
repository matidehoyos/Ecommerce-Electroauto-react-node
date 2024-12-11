import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ producto }) => {
  const nombreProducto = producto?.name.toUpperCase();

  return (
      <Link to={{ pathname: `/producto/${producto.id}`}} className={style.container}>
        <div className={style.imgContainer}>
          <img src={producto.imagen} alt={producto.name} />
        </div>
        <h3>{nombreProducto}</h3>
        <p className={style.detalle}>{producto.detalle}</p>
        <p className={style.precio}><span className={style.precioNumero}>${producto.precio}</span></p>
      </Link>
  );
};

export default ProductCard;

