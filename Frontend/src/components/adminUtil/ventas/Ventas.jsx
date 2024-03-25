import style from "./Ventas.module.css";
import { FaEdit, FaTruck } from 'react-icons/fa';
import { useEffect, useState } from "react";
import preferenceProvider from "../../../utils/provider/preferenceProvider";
import Modal from "react-modal";




const Ventas = () => {
    const [preferences, setPreferences] = useState(null);
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVenta, setCurrentVenta] = useState(null);
  
    const openModal = (venta) => {
      setCurrentVenta(venta);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };


    const bringData = async () => {
        const response = await preferenceProvider.getPreferences();
        const preference = response.data.filter((preference) => {
            return preference.infoMp.date_approved;
          })
        setPreferences(preference)
    }

    useEffect(() => {
        bringData();
    }, []);

    const editarEstado = async (id) => {
        await preferenceProvider.editarEstadoPreference(id);
        bringData();
    }

  return (
    <div className={style.container}>
                { !preferences?.length ?
                <p className={style.noVentas}>NO HAY VENTAS AUN</p> 
                :<div className={style.boxContainer}>
                        <div className={style.titulo}>
                            <h3>Todas las ventas</h3>
                        </div> 
                       <div className={style.tablaVentas}>
                        <table>
                            <thead>
                                <tr>
                                    <th><h6>Estado</h6></th>
                                    <th><h6>Info</h6></th>
                                    <th><h6>Fecha pago</h6></th>
                                    <th><h6><FaEdit /></h6></th>
                                </tr>
                            </thead>
                            <tbody>
                            {preferences.length ?
                             preferences.map((preference, index) => (
                                    <tr key={index}>
                                        <td><p>{preference.estado}</p></td>
                                        <td><p><button className={style.vermas} onClick={() => openModal(preference)}>Ver info</button></p></td>
                                        <td><p>{preference.infoMp?.date_approved?.slice(0,10)}</p></td>
                                        <td><button className={style.botonEditar} onClick={() => editarEstado(preference.id)}><FaTruck className={style.camionIcon}/></button></td>
                                    </tr>
                                )) : null } 
                            </tbody>
                        </table>     
                    </div>   
                </div>}
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Info Modal"
            >
                <p>Fecha: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.infoMp.date_approved.slice(0,9)}</span></p>
                <p>Estado de pago: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.infoMp.status}</span></p>
                <p>Cliente: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.email}</span></p>
                <p>VentaId: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.infoMp.payId}</span></p>
                <p>Metodo: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.infoMp.payment_method_id}</span></p>
                <p>Tipo: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.infoMp.payment_type_id}</span></p>
                <p>Productos: {currentVenta?.infoMp?.productos.map((prod,i) => {
                    return <span style={{fontWeight:'600', color:'#000'}}>{`${prod.quantity} ${prod.title}. `}</span>
                })} </p>
                <p>Total: <span style={{fontWeight:'600', color:'#000'}}>${currentVenta?.infoMp.totalPaid}</span></p>
                <p>Estado de entrega: <span style={{fontWeight:'600', color:'#000'}}>{currentVenta?.estado}</span></p>
                <button style={{ padding:'0', background:'transparent', fontWeight:'800', color:'#000', marginTop:'30px'}} onClick={closeModal}>Cerrar</button>
      </Modal>
        </div>
  );
};

export default Ventas;
