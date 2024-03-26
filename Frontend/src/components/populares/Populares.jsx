import { useEffect, useState } from "react";
import style from "./Populares.module.css";
import { useSelector } from "react-redux";
import ProductoTiendaCard from "../productoTiendaCard/ProductoTiendaCard";
import PopularesCard from "../popularesCard/popularesCard";

const Populares = () => {
    const [productos, setProductos] = useState([]);
    const data = useSelector(state => state.productos)
    const [loading, setLoading] = useState(true);

    const bringData = () => {
        if (data) {
            setProductos(data);
            setLoading(false);
        }
    }

    useEffect(() => {
        bringData();
    },[data]);

  return (
    <div className={style.container}>
        {loading ? (
            <div>Cargando...</div>
        ) : productos && productos.length ? (
            <div className={style.caja}>
                <h4>Más vendidos</h4>
                <div className={style.cajaCards}>
                    {productos.map((producto,i) => (
                        <PopularesCard producto={producto} key={i} />
                    ))}
                </div>
            </div>
        ) : null}
    </div>
  );
};

export default Populares;
