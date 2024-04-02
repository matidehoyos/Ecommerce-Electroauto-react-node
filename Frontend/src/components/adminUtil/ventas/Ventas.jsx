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
    const [infoEnvioModalIsOpen, setInfoEnvioModalIsOpen] = useState(false);
    const [currentInfoEnvio, setCurrentInfoEnvio] = useState(null);
  
    const openInfoEnvioModal = (venta) => {
      setCurrentInfoEnvio(venta.infoEnvio);
      setInfoEnvioModalIsOpen(true);
    };
  
    const closeInfoEnvioModal = () => {
      setInfoEnvioModalIsOpen(false);
    };
  
  
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
                <p className={style.noVentas}>NO HAY VENTAS AÚN</p> 
                :<div className={style.boxContainer}>
                        <div className={style.titulo}>
                            <h3>Todas las ventas</h3>
                        </div> 
                       <div className={style.tablaVentas}>
                        <table>
                            <thead>
                                <tr>
                                    <th><h6>Estado</h6></th>
                                    <th><h6>Detalle</h6></th>
                                    <th><h6>Envio</h6></th>
                                    <th><h6><FaEdit /></h6></th>
                                </tr>
                            </thead>
                            <tbody>
                            {preferences.length ?
                             preferences.map((preference, index) => (
                                    <tr key={index}>
                                        <td><p>{preference.estado}</p></td>
                                        <td><p><button className={style.vermas} onClick={() => openModal(preference)}>Ver</button></p></td>
                                        <td><p><button className={style.vermas} onClick={() => openInfoEnvioModal(preference)}>Ver</button></p></td>
                                        <td><button className={style.botonEditar} onClick={() => editarEstado(preference.id)}><FaTruck className={style.camionIcon}/></button></td>
                                    </tr>
                                )) : null } 
                            </tbody>
                        </table>     
                    </div>   
                </div>}
                <Modal
                className={style.modal}
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
                <p className={style.pModal}>Fecha: <span>{currentVenta?.infoMp.date_approved.slice(0,9)}</span></p>
                <p className={style.pModal}>Estado de pago: <span>{currentVenta?.infoMp.status}</span></p>
                <p className={style.pModal}>Cliente: <span>{currentVenta?.email}</span></p>
                <p className={style.pModal}>VentaId: <span>{currentVenta?.infoMp.payId}</span></p>
                <p className={style.pModal}>Metodo: <span>{currentVenta?.infoMp.payment_method_id}</span></p>
                <p className={style.pModal}>Tipo: <span>{currentVenta?.infoMp.payment_type_id}</span></p>
                <p className={style.pModal}>Productos: {currentVenta?.infoMp?.productos.map((prod,i) => {
                    return <span>{`${prod.quantity} ${prod.title}. `}</span>
                })} </p>
                <p className={style.pModal}>Total: <span>${currentVenta?.infoMp.totalPaid}</span></p>
                <p className={style.pModal}>Estado de entrega: <span>{currentVenta?.estado}</span></p>
      </Modal>

      <Modal
        isOpen={infoEnvioModalIsOpen}
        onRequestClose={closeInfoEnvioModal}
        contentLabel="Info Envio Modal"
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
        {currentInfoEnvio && (
          <div>
            <button className={style.cierre} onClick={closeInfoEnvioModal}>x</button>
            <p className={style.pModal}>Provincia: <span>{currentInfoEnvio.provincia}</span></p>
            <p className={style.pModal}>Ciudad: <span>{currentInfoEnvio.ciudad}</span></p>
            <p className={style.pModal}>Código Postal: <span>{currentInfoEnvio.codigoPostal}</span></p>
            <p className={style.pModal}>Calle: <span>{currentInfoEnvio.calle}</span></p>
            <p className={style.pModal}>Número: <span>{currentInfoEnvio.numero}</span></p>
            <p className={style.pModal}>Piso: <span>{currentInfoEnvio.piso}</span></p>
            <p className={style.pModal}>Departamento: <span>{currentInfoEnvio.departamento}</span></p>
            <p className={style.pModal}>Observaciones: <span>{currentInfoEnvio.observaciones}</span></p>
          </div>
        )}
      </Modal>
        </div>
  );
};

export default Ventas;
