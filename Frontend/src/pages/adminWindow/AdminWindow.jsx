import style from './AdminWindow.module.css'
import { useDispatch, useSelector } from 'react-redux'
import userProvider from '../../utils/provider/userProvider'
import NotFound from '../notFound/NotFound'
import NavBarAdmin from '../../components/adminUtil/navBarAdmin/NavBarAdmin'
import { useEffect, useState } from 'react'
import { loadProductos } from '../../redux/actions'
import { Link, Route, Routes } from 'react-router-dom'
import CreateProducto from '../../components/adminUtil/createProduct/CreateProduct'
import Mensajes from '../../components/adminUtil/mensajes/Mensajes'
import ProductosAdmin from '../../components/adminUtil/productosAdmin/ProductosAdmin'
import Usuarios from '../../components/adminUtil/usuarios/Usuarios'
import productosProvider from '../../utils/provider/productosProvider'
import mensajesProvider from '../../utils/provider/mensajesProvider'
import preferenceProvider from '../../utils/provider/preferenceProvider'
import Ventas from '../../components/adminUtil/ventas/Ventas'

const AdminWindow = () => {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [productos, setProductos] = useState([]);
    const [users, setUsers] = useState([]);
    const [mensajes, setMensajes] = useState([]);
    const [ventas, setVentas] = useState([]); 

    const bringData = async () => {
        const productos = await productosProvider.getProductos();
        setProductos(productos.data);
        dispatch(loadProductos(productos.data))
        const users = await userProvider.getUsers();
        setUsers(users);
        const mensajes = await mensajesProvider.getMensajes();
        setMensajes(mensajes.data);
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
                        </div>

                        <div className={style.caja}>
                            <Routes>
                                    <Route path="productosAdmin" element={<ProductosAdmin />} />
                                    <Route path="createProduct" element={<CreateProducto />} />
                                    <Route path="users" element={<Usuarios />} />
                                    <Route path="mensajes" element={<Mensajes setMensaje={setMensajes}/>} />
                                    <Route path="ventas" element={<Ventas />} />
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