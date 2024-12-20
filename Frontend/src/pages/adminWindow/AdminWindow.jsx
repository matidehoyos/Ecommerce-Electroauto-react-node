import style from './AdminWindow.module.css'
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadProductos } from '../../redux/actions'
import userProvider from '../../utils/provider/userProvider'
import NotFound from '../notFound/NotFound'
import NavBarAdmin from '../../components/adminUtil/navBarAdmin/NavBarAdmin'
import CreateProducto from '../../components/adminUtil/createProduct/CreateProduct'
import Mensajes from '../../components/adminUtil/mensajes/Mensajes'
import ProductosAdmin from '../../components/adminUtil/productosAdmin/ProductosAdmin'
import Usuarios from '../../components/adminUtil/usuarios/Usuarios'
import productosProvider from '../../utils/provider/productosProvider'
import mensajesProvider from '../../utils/provider/mensajesProvider'
import preferenceProvider from '../../utils/provider/preferenceProvider'
import Ventas from '../../components/adminUtil/ventas/Ventas'
import CreateCategory from '../../components/adminUtil/createCategory/CreateCategory'
import categoriasProvider from '../../utils/provider/categoriasProvider'
import Categorias from '../../components/adminUtil/categorias/Categorias'

const AdminWindow = () => {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [productos, setProductos] = useState([]);
    const [users, setUsers] = useState([]);
    const [mensajes, setMensajes] = useState([]);
    const [ventas, setVentas] = useState([]); 
    const [categorias, setCategorias] = useState([]); 

    const bringData = async () => {
        const productos = await productosProvider.getProductos();
        setProductos(productos.data);
        dispatch(loadProductos(productos.data))
        const users = await userProvider.getUsers();
        setUsers(users);
        const mensajes = await mensajesProvider.getMensajes();
        setMensajes(mensajes.data);
        const categorias = await categoriasProvider.getCategorias();
        setCategorias(categorias.data);
        const preferences = await preferenceProvider.getPreferences();
        const ventas = preferences.data.filter((preference) => {
            return preference.infoMp.date_approved;
          })
        setVentas(ventas);
    }

    useEffect(() => { 
        bringData();
    }, []);

    const mensajesNoLeidos = mensajes.filter(mensaje => mensaje.leido === "NO");

    return (
        <>
              {  
              currentUser.role === 'admin' ?

                <div className={style.container}>
                    <NavBarAdmin />
                    
                    <div className={style.subContainer}>
                        <div className={style.estadisticas}>
                        {
                                    mensajesNoLeidos ?
                                    <Link to="/admin/mensajes">
                                        <div className={style.cardContainer}>
                                            <h3>Mensajes</h3>
                                            {
                                                mensajesNoLeidos.length === 0 ?
                                                <p style={{color: 'red'}}>{mensajesNoLeidos.length}</p>
                                                :
                                                <p style={{color: 'green'}}>{mensajesNoLeidos.length}</p>
                                            }
                                        </div> 
                                    </Link>
                                    : <p>"No hay mensajes nuevos."</p>
                                }
                                {
                                     users ?
                                     <Link to="/admin/users">
                                     <div className={style.cardContainer}>
                                         <h3>Usuarios</h3>
                                         <p>{users.length}</p>
                                     </div> 
                                     </Link>
                                    : <p>"No hay usuarios aun."</p>
                                    }
                                { 
                                    productos ?
                                    <Link to="/admin/productosAdmin">
                                    <div className={style.cardContainer}>
                                        <h3>Productos</h3>
                                        <p>{productos.length}</p>
                                    </div> 
                                    </Link>
                                    : <p>"No hay productos cargados aun."</p>
                                }
                                { 
                                    ventas ?
                                    <Link to="/admin/ventas">
                                    <div className={style.cardContainer}>
                                        <h3>Ventas</h3>
                                        <p>{ventas.length}</p>
                                    </div> 
                                    </Link>
                                    : <p>"No hay ventas aun."</p>
                                }
                                { 
                                    categorias ?
                                    <Link to="/admin/categorias">
                                        <div className={style.cardContainer}>
                                            <h3>Categorias</h3>
                                            <p>{categorias.length}</p>
                                        </div> 
                                    </Link>
                                    : <p>"No hay categorias aun."</p>
                                }
                        </div>

                        <div className={style.caja}>
                            <Routes>
                                    <Route path="" element={<CreateProducto />} />
                                    <Route path="productosAdmin" element={<ProductosAdmin />} />
                                    <Route path="users" element={<Usuarios />} />
                                    <Route path="mensajes" element={<Mensajes setMensaje={setMensajes}/>} />
                                    <Route path="ventas" element={<Ventas />} />
                                    <Route path="createCategoria" element={<CreateCategory />} />
                                    <Route path="categorias" element={<Categorias />} />
                            </Routes>
                        </div>
                     </div>
                    </div>                
                   : 
                <NotFound /> 
                }
        </>
    )
}
export default AdminWindow