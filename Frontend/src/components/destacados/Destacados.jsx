import style from "./Destacados.module.css";
import { useSelector } from "react-redux";
import ProductCard from "../productCard/ProductCard";

const Destacados = () => {
  const productos = useSelector(state => state.productos)?.slice(0, 12);

  return (
    <div className={style.container}>
          {productos?.map(producto => (
            <ProductCard producto={producto} key={producto.id} />
          ))}
    </div>
  );
};

export default Destacados;

