import style from './Home.module.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadProductos } from '../../redux/actions';
import productosProvider from '../../utils/provider/productosProvider';
import Header from '../../components/header/Header';
import ProductsHome from '../../components/productsHome/ProductsHome';
import Review from '../../components/review/Review';
import LedCarrusel from '../../components/ledCarrusel/LedCarrusel';
import InfoEnvios from '../../components/infoEnvios/InfoEnvios';
import AboutUs from '../../components/aboutUs/AboutUs';
import Footer from '../../components/footer/Footer';
import BotonFlotanteCart from '../../components/botonFlotanteCart/BotonFlotanteCart';


const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const getData = async () => {
        const response = await productosProvider.getProductos();
        dispatch(loadProductos(response.data));
    }

    useEffect(() => {
        getData();
    }, []); 

    return(
        <div className={style.container}>
            {location.pathname !== '/admin' && <BotonFlotanteCart />}
           <Header />
           <ProductsHome />
           <InfoEnvios />
           <Review />
           <LedCarrusel />
           <AboutUs />
           <Footer />
        </div>
    )
}

export default Home;