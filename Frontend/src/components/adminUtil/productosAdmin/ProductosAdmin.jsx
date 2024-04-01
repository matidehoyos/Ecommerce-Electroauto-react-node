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
                style={{
                    overlay: {
                        background: 'rgba(256,256,256,.6',
                        backdropFilter: 'blur(5px)'
                    },
                    content: {
                        width: '90vw',
                        height: '90%',
                        margin: '0 auto',
                        marginTop: '0',
                        border: 'none',
                        background: 'rgba(256,256,256,1',
                        boxShadow: '0px 0px 20px rgba(0,0,0,.7)',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '6px',
                        outline: 'none',
                        padding: '10px',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        position: 'relative',
                        left: '0vw',
                        top: '50px',
                        }
                    }}
            >
                <button className={style.cierre} onClick={closeModal}>x</button>
                <p className={style.pModal}>Id: <span>{prod?.id}</span></p>
                <p className={style.pModal}>Nombre: <span>{prod?.name}</span></p>
                <p className={style.pModal}>Detalle: <span>{prod?.detalle}</span></p>
                <p className={style.pModal}>Info: <span>{prod?.informacion}</span></p>
                <p className={style.pModal}>Categoria: <span>{prod?.categoria}</span></p>
                <p className={style.pModal}>Stock: <span>{prod?.cantidad}</span></p>
                <p className={style.pModal}>Precio: <span>{prod?.precio}</span></p>
                <button className={style.botonEditar} onClick={() => editarProducto(prod)}>Editar producto</button>
                <button className={style.botonEliminar} onClick={() => deleteProducto(prod.id)}>Eliminar producto</button>
      </Modal>
    </div>
  );
};

export default ProductosAdmin;
