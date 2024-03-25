import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./ProductoDetail.module.css";
import { useNavigate } from "react-router-dom";
import productosProvider from "../../utils/provider/productosProvider";
import NavBar from "../navBar/NavBar";
import PreNav from "../preNav/PreNav";
import { FaShoppingCart } from "react-icons/fa";


export default function ProductoDetail() { 
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const nombre = product?.name.toUpperCase();
  const [unidades, setUnidades] = useState(1);
  const subtotal = unidades * product?.precio;

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
    }



  const getProducto = async () => {
    try {
      const producto = await productosProvider.getProductoById(id);
      setProduct(producto);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducto();
  }, [])

  const backToHome = () => {
    navigate('/tienda');
  }


  return (
    <div className={style.container}>
      <PreNav /> 
      <NavBar />
      <div className={style.caja}>
        <div className={style.imagen}>
          <img src={product?.imagen} alt={product?.name} />
        </div>
        <div className={style.texto}>
          <h6>{product?.categoria}</h6>
          <h2>{nombre}</h2>
          <p>{product?.detalle}</p>
          <p>{product?.informacion}</p>
          <div className={style.botonAgregar}>
            <div className={style.unidades}>
              <label>Cantidad:</label>
              <select onChange={handleChange}>
            {[...Array(20).keys()].map((value, index) => 
          <option key={index} value={value + 1}>
            {value + 1} {value === 0 ? 'unidad' : 'unidades'}
          </option>
        )}
            </select> 
            </div>
              <button className={style.botonKart} onClick={agregarAlCarrito}><FaShoppingCart className={style.icon}/>AGREGAR AL CARRITO</button>  
          </div>  
        </div>
      </div>
    </div>
  );
}