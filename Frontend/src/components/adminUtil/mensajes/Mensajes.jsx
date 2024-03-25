import style from "./Mensajes.module.css";
import { useEffect, useState } from "react";
import mensajesProvider from "../../../utils/provider/mensajesProvider";
import { FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';


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
                                        <td><p><button className={style.vermas} onClick={() => openModal(mensaje)}>Leer mensaje</button></p></td>
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
                    contentLabel="Mensaje Modal" >
                    <h3>{currentMessage?.name}</h3>
                    <h5>{currentMessage?.nombre}</h5>
                    <p  style={{padding:'0', color:'#000', fontWeight:'500'}}>{currentMessage?.email}</p>
                    <p  style={{padding:'0', color:'#000', fontSize:'18px', fontWeight:'600'}}>{currentMessage?.mensaje}</p>
                    <p><a href={`mailto:${currentMessage?.email}`}  style={{ padding:'0', color:'blue'}}>Responder</a></p>
                    <button onClick={closeModal} style={{ background:'transparent',padding:'0', color:'#000'}} >Cerrar</button>
            </Modal>
        </div>}
    </div>
  );
};

export default Mensajes;
