import style from './Home.module.css'
import { useDispatch } from 'react-redux';
import productosProvider from '../../utils/provider/productosProvider';
import NavBar from '../../components/navBar/NavBar';
import { loadProductos } from '../../redux/actions';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import AboutUs from '../../components/aboutUs/AboutUs';
import SubHeader from '../../components/subHeader/SubHeader';
import Footer from '../../components/footer/Footer';
import Review from '../../components/review/Review';
import InfoEnvios from '../../components/infoEnvios/InfoEnvios';
import BotonFlotanteCart from '../../components/botonFlotanteCart/BotonFlotanteCart';
import { useLocation } from 'react-router';
import HeaderCarrusel from '../../components/headerCarrusel/HeaderCarrusel';


const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [reviews, setReviews] = useState([]);

    const bringData = async () => {
        const response = await productosProvider.getProductos();
        dispatch(loadProductos(response.data));
    }

    useEffect(() => {
        bringData();
    }, []); 

    return(
        <div className={style.container}>
            {location.pathname !== '/admin' && <BotonFlotanteCart />}
           <Header />
           <SubHeader />
           <InfoEnvios />
           <Review reviews={reviews} mensajes={messages} />
           <HeaderCarrusel />
           <AboutUs />
           <Footer />
        </div>
    )
}

export default Home;