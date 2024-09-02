import { Link } from "react-router-dom";
import style from "./PopularesCard.module.css";

const PopularesCard = ({ producto }) => {
  const nombreProducto = producto?.name.toUpperCase();

  return (
    <div className={style.container}>
      <Link to={{ pathname: `/producto/${producto.id}`}}>
        <div className={style.imgContainer}>
          <img src={producto.imagen} alt={producto.name} />
        </div>
        <h3>{nombreProducto}</h3>
        <p className={style.detalle}>{producto.detalle}</p>
        <p className={style.precio}><span className={style.precioNumero}>${producto.precio}</span></p>
      </Link>
    </div>
  );
};

export default PopularesCard;

