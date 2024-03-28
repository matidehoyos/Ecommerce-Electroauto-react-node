import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import AdminWindow from './pages/adminWindow/AdminWindow'
import Usuarios from './components/adminUtil/usuarios/Usuarios'
import Tienda from './pages/tienda/Tienda'
//import Carrito from './components/carrito/Carrito'
import ContactUs from './pages/contactUs/ContactUs'
import Productos from './components/productos/Productos'
import ProductoDetail from './components/productoDetail/ProductoDetail'
import PostPago from './pages/postPago/PostPago'
import BotonFlotanteCart from './components/botonFlotanteCart/BotonFlotanteCart'
import axios from "axios";
import CarritoContext from './components/carritoContext/CarritoContext';
import { useState } from 'react';

  // axios.defaults.baseURL = 'https://electrocar-production.up.railway.app'
  axios.defaults.baseURL = 'http://localhost:3000'

function App() {
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);

  return (
    <div>
        <CarritoContext.Provider value={{ carrito, setCarrito }} >
           <BotonFlotanteCart /> 
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/tienda" element={<Tienda />}></Route>
                    <Route path="/admin/*" element={<AdminWindow />}></Route>
                    <Route path="/users" element={<Usuarios />}></Route>
              {/*}      <Route path="/carrito" element={<Carrito />}></Route> */}
                    <Route path="/contacto" element={<ContactUs/>}></Route>
                    <Route path="/:nombre" element={<Productos />}></Route> 
                    <Route path="/producto/:id" element={<ProductoDetail />}></Route>
                    <Route path="/successpayment" element={<PostPago />}></Route>
                </Routes>
        </CarritoContext.Provider >
    </div>
  )
}

export default App
