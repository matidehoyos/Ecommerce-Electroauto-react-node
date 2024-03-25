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
                                    <td><p><button className={style.vermas} onClick={() => openModal(user)}>Ver info</button></p></td>
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
            >
                <p>Id: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.id}</span></p>
                <p>Nombre: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.name}</span></p>
                <p>Email: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.email}</span></p>
                <p>Rol: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.role}</span></p>
                <p>Compra: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.compra.id}</span></p>
                <p>Suspendido: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.suspended}</span></p>
                <p>Baneado: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.banned}</span></p>
                <p>Creado: <span style={{fontWeight:'600', color:'#000'}}>{currentUser?.createdAt.slice(0,10)}</span></p>
                <button style={{ padding:'0', background:'transparent', fontWeight:'800', color:'#000', marginTop:'30px'}} onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Usuarios;
