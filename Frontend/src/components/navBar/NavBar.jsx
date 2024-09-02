import React, { useEffect, useState } from 'react';
import style from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../loginButton/LoginButton";
import SearchBar from "../searchBar/SearchBar";
import  UserAccountMobile from '../userAccountMobile/UserAccountMobile';
import PreNav from '../preNav/PreNav';
import { HiMenu, HiX } from 'react-icons/hi';


const NavBar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  const [isVisible, setIsVisible] = useState(false);
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleShowMenu = () => {
    setIsVisible(!isVisible);
  }

  const ocultarMenu = () => {
    const menu = document.querySelector(`.${style.menu}`);
    menu.style.left = "-800px";
  }

  const handleFilter = (e) => {
    e.preventDefault();
    navigate(`/${e.target.value}`);
  }

  return (
    <div className={style.container}>
          <PreNav />
      <div className={style.firstRow}>
           <div className={style.logo}>
              <Link to="/">
                  <img src="logoPc.png" alt="Logo" />
              </Link>
            </div>
          
          <div className={style.menu} onClick={ocultarMenu} style={isVisible ? { left: '0px' } : { left: '-800px' }}>
            <div className={style.searchBar}>
              <SearchBar />
            </div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/tienda">Tienda</Link>
                  </li>
                  <li>
                    <Link to="/contacto">Contacto</Link>
                  </li>
                </ul>
              </nav>
              
                <div className={style.login} >
                <LoginButton />
                </div>
            

             {user?.name ? <UserAccountMobile /> : null}
            </div>   
            <div className={style.hamburgContainer}>
              <button className={style.menuButton} onClick={handleShowMenu}> {isVisible ? <HiX /> : <HiMenu />}</button>
            </div>
      </div>

      <div className={style.secondRow}>
          <button onClick={handleFilter} value={"tienda"}>Todos</button>
          <button onClick={handleFilter} value={"accesorios"}>Accesorios</button>
          <button onClick={handleFilter} value={"iluminacion"}>Iluminacion</button>
          <button onClick={handleFilter} value={"audio"}>Audio</button>
          <button onClick={handleFilter} value={"seguridad"}>Seguridad</button>
      </div>
    </div>
  );
};

export default NavBar;
