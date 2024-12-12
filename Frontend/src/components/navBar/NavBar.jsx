import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../searchBar/SearchBar";
import LoginButton from "../loginButton/LoginButton";
import PreNav from '../preNav/PreNav';
import UserAccountMobile from '../userAccountMobile/UserAccountMobile';
import { HiMenu, HiX } from 'react-icons/hi';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const isHome = location.pathname === '/';
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        if ( window.scrollY > 400) {
          setIsScrolled(true);
          setShowLogo(true);
        } else {
          setIsScrolled(false);
          setShowLogo(false);
        }
      }
    };

    if (!isHome) {
      setIsScrolled(true);
      setShowLogo(true);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleShowMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    navigate(`/${e.target.value}`);
  };

  return (
    <div
      className={`${style.container} ${isScrolled ? style.scrolled : ''} ${
        isHome ? style.transparent : style.defaultBg
      }`}
    >
      <PreNav />
      <div className={style.firstRow}>
          <div className={style.logo}>
            <Link to="/">
              <img src="logoPc.png" alt="Logo" />
            </Link>
          </div>

        <div className={style.menu} onClick={handleShowMenu} style={isVisible ? { left: '0px' } : { left: '-1200px' }}>
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

          <div className={style.login}>
            <LoginButton />
          </div>

          {user?.name ? <UserAccountMobile /> : null}
        </div>

        <div className={style.hamburgContainer}>
          <button className={style.menuButton} onClick={handleShowMenu}>
            {isVisible ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <div className={style.secondRow}>
        <button onClick={handleFilter} value={"tienda"}>Todos</button>
        <button onClick={handleFilter} value={"accesorios"}>Accesorios</button>
        <button onClick={handleFilter} value={"iluminacion"}>Iluminación</button>
        <button onClick={handleFilter} value={"audio"}>Audio</button>
        <button onClick={handleFilter} value={"seguridad"}>Seguridad</button>
      </div>
    </div>
  );
};

export default NavBar;

