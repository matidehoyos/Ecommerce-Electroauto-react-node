import { useEffect, useState } from "react";
import style from "./Populares.module.css";
import { useSelector } from "react-redux";
import ProductoTiendaCard from "../productoTiendaCard/ProductoTiendaCard";
import PopularesCard from "../popularesCard/popularesCard";

const Populares = () => {
    const [productos, setProductos] = useState([]);
    const data = useSelector(state => state.productos)
    const [loading, setLoading] = useState(true);
    const [populares, setPopulares ] = useState([])

    const bringData = () => {
        if (data) {
            setProductos(data);
            setLoading(false);
            const populares = data.slice(0, 5);
            setPopulares(populares)
        }
    }

    useEffect(() => {
        bringData();
    },[data]);

  return (
    <div className={style.container}>
        {loading ? (
            <div>Más vendidos</div>
        ) : populares && populares.length ? (
            <div className={style.caja}>
                <div className={style.cajaCards}>
                    {populares.map((producto,i) => (
                        <PopularesCard producto={producto} key={i} />
                    ))}
                </div>
            </div>
        ) : null}
    </div>
  );
};

export default Populares;
