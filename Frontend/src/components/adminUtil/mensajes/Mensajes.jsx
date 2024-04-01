import style from "./Mensajes.module.css";
import { useEffect, useState } from "react";
import mensajesProvider from "../../../utils/provider/mensajesProvider";
import { FaCheck, FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa';
import Modal from 'react-modal';
import { IoIosMailOpen, IoIosMail } from 'react-icons/io';

const Mensajes = ({setMensaje}) => {
    const [mensajes,setMensajes] = useState([]);
    const [mensajesFiltrados, setMensajesFiltrados] = useState([]);
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);



    const bringData = async () => {
        const response = await mensajesProvider.getMensajes();
        setMensajes(response.data);
        setMensaje(response.data);
    }

    useEffect(() => {
        bringData();
    }, []);

    const marcarLeido = async (id) => {
        await mensajesProvider.marcarLeido(id);
        bringData();
    }

    const eliminarMensaje = async (id) => {
        try {
            await mensajesProvider.eliminarMensaje(id);
            const mensajesActualizados = mensajesFiltrados.filter(mensaje => mensaje.id !== id);
            setMensajesFiltrados(mensajesActualizados);
        } catch (error) {
            console.error("Error al eliminar el mensaje:", error);
        }
    }

    useEffect(() => {
        setMensajesFiltrados(mensajes);
    }, [mensajes]);



 const openModal = (message) => {
    setCurrentMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <div className={style.container}>
        { !mensajesFiltrados.length ?
         <p className={style.noMsj}>"NO HAY MENSAJES AUN"</p> 
        :<div className={style.boxContainer}>
                 <div className={style.titulo}>
                    <h3>Todos los mensajes</h3>
                </div>
                <div className={style.tablaMensajes}>
                        <table>
                            <thead>
                                <tr>
                                    <th><h6>Nombre</h6></th>
                                    <th><h6>Mensaje</h6></th>
                                    <th><h6>Leído</h6></th>
                                    <th><h6><FaEdit color="green"/></h6></th>
                                    <th><h6><FaTrashAlt color="red" /></h6></th>
                                </tr>
                            </thead>
                            <tbody>
                                {mensajesFiltrados.map((mensaje, index) => (
                                    <tr key={index}>
                                        <td><p>{mensaje.name}</p></td>
                                        <td><p><button className={style.vermas} onClick={() => openModal(mensaje)}>Leer</button></p></td>
                                        <td><p>{mensaje.leido}</p></td>
                                        <td><p><button className={style.botonLeido} onClick={() => marcarLeido(mensaje.id)}><FaCheck /></button></p></td>
                                        <td><p><button className={style.botonEliminar} onClick={() => eliminarMensaje(mensaje.id)}><FaTrashAlt /></button></p></td>
                                    </tr>
                                ))  }
                            </tbody>
                        </table>            
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Mensaje Modal" 
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
                            paddingBottom: '10px',
                            overflowX: 'hidden',
                            overflowY: 'scroll',
                            position: 'relative',
                            left: '0vw',
                            top: '50px',
                            }
                        }}>
                    <button onClick={closeModal} className={style.cierre} >x</button>
                    <p className={style.pModal}><FaUser  className={style.iconU} /><span>{currentMessage?.name}</span></p>
                    <div className={style.emailRow}><p className={style.pEmail}><IoIosMail className={style.iconE}/> <span>{currentMessage?.email}</span></p></div>
                    <p className={style.pMensaje}><IoIosMailOpen className={style.iconO} /> <span>{currentMessage?.mensaje}</span></p>
                    <p className={style.pResponder}><a href={`mailto:${currentMessage?.email}`} >Responder</a></p>
            </Modal>
        </div>}
    </div>
  );
};

export default Mensajes;
