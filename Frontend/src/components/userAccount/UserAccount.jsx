import { useAuth0 } from "@auth0/auth0-react"
import style from "./UserAccount.module.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserData } from "../../redux/actions";
import userProvider from "../../utils/provider/userProvider";
import preferenceProvider from "../../utils/provider/preferenceProvider";


export const UserAccount = ({ menuIsActive }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { logout } = useAuth0();
  let fecha = currentUser.createdAt?.split("");
  let res = fecha?.slice(0, 10);
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState({});
  const [preference, setPreference] = useState(null);
  

  const bringData = async () => {
    const preferences = await preferenceProvider.getPreferences();
    const user = await userProvider.getUserByEmail(currentUser.email);
    setUsuario(user);  
    const preference = preferences.data.filter((preference) => {
      return preference.preferenceId === user.compra.preferenceId;
    })
    setPreference(preference[0]);
  }

  useEffect(() => {
    bringData();
  }, []);

  const handleLogut = () => {
    logout()
    dispatch(resetUserData())
    localStorage.removeItem('user');
  }

  return (
    <div className={style.infoContainer} style={menuIsActive ? { left: '-800px'}:{ left: '0' }  }>
      <div className={style.imgAndNameContainer}>
        <img src={currentUser?.image}></img>
        <h2>{currentUser?.name}</h2>
        <p>{currentUser?.email}</p>
      </div>
      <div className={style.planAndMembershipContainer}>
        {
          currentUser?.role === "admin" ? (
            <>
              <p>Rol: <span className={style.role}>Administrador</span></p>
            </>
          )
            : null
        }
      </div>
      <div className={style.buttonsContainer}>
          {
            currentUser && currentUser?.role === 'admin' ? (
              <Link to={'/admin'}>
                <button className={style.botonPanel}>Panel administrativo</button>
              </Link>
            ) : null
          }
        { preference ? <p className={style.data}>Ultima compra: <span>{preference?.infoMp?.date_approved?.slice(0,9)}</span></p> : null }
        { preference ? <p className={style.data}>Estado de compra: <span>{preference?.estado}</span></p> : null }
        <button className={style.logout} onClick={handleLogut}>Cerrar sesion</button>
      </div>
    </div>
  )
}