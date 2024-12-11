import style from './LoginButton.module.css'
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux'
import { loadUserData } from "../../redux/actions";
import { UserAccount } from '../userAccount/UserAccount'
import userProvider from '../../utils/provider/userProvider';


const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0();
  const dispatch = useDispatch();
  const [menuIsActive, setMenuIsActive] = useState(true)
  const currentUser = JSON.parse(localStorage.getItem('user'));

const postUserData = async () => {
    if(!user) return;
    try {
        const newUser = {
        name: user?.name,
        email: user?.email,
        image: user?.picture,
        }
       const response = await userProvider.createUser(newUser);
       dispatch(loadUserData(response.data.user))
       localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Error al enviar los datos del usuario al servidor:', error.message);
     } 
    } 


  useEffect(() => {
    postUserData();
  }, [user])


  const handleLogin = () => {
    loginWithRedirect()
  }

  const activeMenu = () => {
    setMenuIsActive(!menuIsActive)
  }


  return (
    <div className={style.containerLogin}>
      {
        !currentUser?.name ? (
        <button className={style.buttonLogin} onClick={handleLogin}>Iniciar sesion</button>
        )
        : 
        <>
         <UserAccount menuIsActive={menuIsActive} activeMenu={activeMenu} />
          <div className={style.containerButtonUser} >
            <div className={style.containerNameAndButton}>
              <button onClick={activeMenu}>
                <p>MENU</p>
              </button>
            </div>
          </div>
        </>
        }
    </div>

  );
};

export default LoginButton;