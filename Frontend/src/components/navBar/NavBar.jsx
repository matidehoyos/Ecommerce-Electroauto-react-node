import React, { useEffect, useState } from 'react';
import style from "./NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginButton from "../loginButton/LoginButton";
import SearchBar from "../searchBar/SearchBar";
import { FiMenu } from 'react-icons/fi';
import  UserAccountMobile from '../userAccountMobile/UserAccountMobile';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi'
import PreNav from '../preNav/PreNav';
import { VscThreeBars } from 'react-icons/vsc';
import { FaCaretDown } from 'react-icons/fa';
import { MdExpandMore } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { UserAccount } from '../userAccount/UserAccount';


const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  let user = JSON.parse(localStorage.getItem('user'));
  const [isScrolled, setIsScrolled] = useState(false);


  const handleScroll = () => {
    if (location.pathname === "/") {
      setIsScrolled(window.scrollY > 600);
    } else {
      setIsScrolled(true);
    }
  };

 
  useEffect(() => {
    handleScroll();
     window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };

  }, []);
  
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);

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
    <div className={isScrolled ? style.scrolled : style.container}>
          <PreNav />
      <div className={style.firstRow}>
           <div className={style.logo}>
              <Link to="/">
                  <img src="./logoPc.png" alt="Logo" />
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
              <button className={style.menuButton} onClick={handleShowMenu}> {isVisible ? <IoIosArrowBack /> : <IoIosArrowForward />}</button>
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
