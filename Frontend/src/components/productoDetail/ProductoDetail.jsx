import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./ProductoDetail.module.css";
import productosProvider from "../../utils/provider/productosProvider";
import { FaShoppingCart } from "react-icons/fa";
import CarritoContext from "../carritoContext/CarritoContext";

export default function ProductoDetail() { 
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [product, setProduct] = useState();
  const [unidades, setUnidades] = useState(1);
  const subtotal = unidades * product?.precio;
  
  const getProducto = async () => {
    try {
      const producto = await productosProvider.getProductoById(id);
      setProduct(producto);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false); 
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUnidades(value);
  }

  const agregarAlCarrito = async () => {
    const productoCarrito = {
      id: product.id,
      name: product.name,
      imagen: product.imagen,
      detalle: product.detalle,
      unidades: unidades,
      subtotal: subtotal,
      categoria: product.categoria,
      precio: product.precio,
    }
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productoCarrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    setCarrito(carrito);
  }

  return (
    <div className={style.container}>
      { loader ? (
        <div className={style.loader}>
          <img src="ELECT.png" alt="logo" />
        </div>
      ) : (
        <div>
          <h2 className={style.name}>{product?.name.toUpperCase()}</h2>
          <div className={style.caja}>
            <div className={style.imagen}>
              <img src={product?.imagen} alt={product?.name} />
            </div>
            <div className={style.texto}>
              <div className={style.data}>
                <p className={style.detalle}>{product?.detalle}</p>
                <p className={style.info}>{product?.informacion}</p>
                <p className={style.stock}>Stock disponible: <span>{product?.cantidad}</span> unidades.</p>
                <p className={style.precio}>${product?.precio}</p>
              </div>
              <div className={style.botonAgregar}>
                <div className={style.unidades}>
                  <select onChange={handleChange}>
                    {[...Array(20).keys()].map((value, index) => 
                      <option key={index} value={value + 1}>
                        {value + 1} {value === 0 ? 'unidad' : 'unidades'}
                      </option>
                    )}
                  </select> 
                </div>
                <button className={style.botonKart} onClick={agregarAlCarrito}>
                  <FaShoppingCart className={style.icon}/>AGREGAR AL CARRITO
                </button>  
              </div>  
            </div>
          </div>
          <Link to='/tienda'>
            <button className={style.backTienda}>
              Volver a la tienda
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
