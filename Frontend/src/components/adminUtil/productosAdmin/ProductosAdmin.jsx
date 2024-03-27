import productosProvider from "../../../utils/provider/productosProvider";
import style from "./ProductosAdmin.module.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadProductos } from "../../../redux/actions";
import FormularioEdicion from "../../formularioEdicion/FormularioEdicion";
import Modal from "react-modal";




const ProductosAdmin = () => {
    const dispatch = useDispatch();
    const productos = useSelector(state => state.productos);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [prod, setProd] = useState(null);
  
    const openModal = (producto) => {
      setProd(producto);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };


    const bringData = async () => {
        const response = await productosProvider.getProductos();
        dispatch(loadProductos(response.data));
    }

    useEffect(() => {
        bringData();
    }, []);

    useEffect(() => {
        setProductosFiltrados(productos);
    }, [productos]);

    const deleteProducto = async (productId) => {
        try {
            await productosProvider.deleteProducto(productId);
            const productosActualizados = productosFiltrados.filter(producto => producto.id !== productId);
            setProductosFiltrados(productosActualizados);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    const editarProducto = (producto) => {
        setProductoEditando(producto);
        setMostrarModal(true);
        closeModal();
      }

    const cerrarModal = () => {
        setMostrarModal(false);
      }


  return (
    <div className={style.container}>
        { !productosFiltrados?.length ?
        <p className={style.noProductos}>NO HAY PRODUCTOS AUN</p>
        :<div className={style.boxContainer}>
                 <div className={style.titulo}>
                    <h3>Todos los productos</h3>
                </div>
                {mostrarModal && <FormularioEdicion productoEditando={productoEditando} cerrarModal={cerrarModal} />}
                <div className={style.tablaProductos} style={{ display: mostrarModal ? 'none' : 'flex' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th><h6>Nombre</h6></th>
                                    <th><h6>Imagen</h6></th>
                                    <th><h6>Info</h6></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                productosFiltrados?.map((producto, index) => (
                                    <tr key={index}>
                                        <td><h5>{producto.name}</h5></td>
                                        <td><p><img className={style.imgProd} src={producto.imagen} alt={producto.name}/></p></td>
                                        <td><h6><button className={style.vermas} onClick={() => openModal(producto)}>Ver info</button></h6></td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>            
                </div>
        </div>}
        <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Info Modal"
            >
                <p>Id: <span style={{fontWeight:'600', color:'#000'}}>{prod?.id}</span></p>
                <p>Nombre: <span style={{fontWeight:'600', color:'#000'}}>{prod?.name}</span></p>
                <p>Detalle: <span style={{fontWeight:'600', color:'#000'}}>{prod?.detalle}</span></p>
                <p>Info: <span style={{fontWeight:'600', color:'#000'}}>{prod?.informacion}</span></p>
                <p>Categoria: <span style={{fontWeight:'600', color:'#000'}}>{prod?.categoria}</span></p>
                <p>Stock: <span style={{fontWeight:'600', color:'#000'}}>{prod?.cantidad}</span></p>
                <p>Precio: <span style={{fontWeight:'600', color:'#000'}}>{prod?.precio}</span></p>
                <p><button className={style.botonEditar} onClick={() => editarProducto(prod)}>Editar producto</button></p>
                <p><button className={style.botonEliminar} onClick={() => deleteProducto(prod.id)}>Eliminar producto</button></p>
                <button style={{ padding:'0', background:'transparent', fontWeight:'800', color:'#000', marginTop:'30px'}} onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default ProductosAdmin;
