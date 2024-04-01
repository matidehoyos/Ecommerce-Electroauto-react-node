import { useEffect, useState } from "react";
import userProvider from "../../../utils/provider/userProvider";
import style from "./Usuarios.module.css";
import Modal from "react-modal";


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
  
    const openModal = (user) => {
      setCurrentUser(user);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const bringData = async () => {
        const users = await userProvider.getUsers();
        setUsuarios(users);
    }

    useEffect(() => {
       bringData();
    }, []);


    

  return (
    <div className={style.container}>
        
        { !usuarios.length ? 
        <p className={style.noUsers}>NO HAY USUARIOS AUN</p>
        :
            <div className={style.boxContainer}>
              <div className={style.titulo}>
                <h3>Todos los usuarios</h3>
              </div>
              <div className={style.tablaUsers}>
                    <table>
                        <thead>
                            <tr>
                                <th><h6>Nombre</h6></th>
                                <th><h6>Info</h6></th>
                                <th><h6>Editar</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((user, index) => (
                                <tr key={index}>
                                    <td><h5>{user.name}</h5></td>
                                    <td><p><button className={style.vermas} onClick={() => openModal(user)}>Ver</button></p></td>
                                    <td><p><button className={style.botonEditar} onClick={() => editarUser(user.id)}>Editar</button></p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
            </div>
           }
          <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Info Modal"
                style={{
                  overlay: {
                      background: 'rgba(256,256,256,.6)',
                      backdropFilter: 'blur(5px)'
                  },
                  content: {
                      width: '90%',
                      height: '90%',
                      margin: '0 auto',
                      border: 'none',
                      background: 'rgba(256,256,256,1',
                      boxShadow: '0px 0px 20px rgba(0,0,0,.7)',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '6px',
                      outline: 'none',
                      padding: '0px 10px',
                      overflowX: 'hidden',
                      overflowY: 'scroll',
                      position: 'relative',
                      left: '0vw',
                      top: '50px',
                      }
                  }}
            >
                <button className={style.cierre} onClick={closeModal}>x</button>
                <p className={style.pModal}>Id: <span>{currentUser?.id}</span></p>
                <p className={style.pModal}>Nombre: <span>{currentUser?.name}</span></p>
                <p className={style.pModal}>Email: <span>{currentUser?.email}</span></p>
                <p className={style.pModal}>Rol: <span>{currentUser?.role}</span></p>
                <p className={style.pModal}>Compra: <span>{currentUser?.compra.id}</span></p>
                <p className={style.pModal}>Suspendido: <span>{currentUser?.suspended}</span></p>
                <p className={style.pModal}>Baneado: <span>{currentUser?.banned}</span></p>
                <p className={style.pModal} >Creado: <span>{currentUser?.createdAt.slice(0,10)}</span></p>
      </Modal>
    </div>
  );
};

export default Usuarios;
