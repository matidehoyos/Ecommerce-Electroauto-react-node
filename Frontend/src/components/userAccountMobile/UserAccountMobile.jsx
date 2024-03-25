import { useAuth0 } from "@auth0/auth0-react"
import style from "./UserAccountMobile.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginButton from "../loginButton/LoginButton";
import { useEffect, useState } from "react";
import preferenceProvider from "../../utils/provider/preferenceProvider";
import userProvider from "../../utils/provider/userProvider";
import { resetUserData } from "../../redux/actions";


const UserAccountMobile = () => {
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
    <div className={style.infoContainer}>
      <div className={style.imgAndNameContainer}>
        <div className={style.imgAndName}>
          <img src={currentUser?.image}></img>
          <h2>{currentUser?.name}</h2>
        </div>
      </div>     
      
      <div className={style.buttonsContainer}>
        { currentUser && currentUser.role === 'admin' ? (
          <Link to={'/admin'}>
               <button className={style.adminButton}>Panel admin</button>
          </Link>  ) 
       : null }
       { preference ? <p className={style.data}>Ultima compra: <span>{preference?.infoMp?.date_approved?.slice(0,9)}</span></p> : null }
      { preference ? <p className={style.data}>Estado de compra: <span>{preference?.estado}</span></p> : null }
       {
        !currentUser.email ?
        <LoginButton />
        :  <button onClick={handleLogut}>Cerrar sesion</button>
       }
      <div>
   
        </div>
      </div>
    </div>
  )
}


export default UserAccountMobile