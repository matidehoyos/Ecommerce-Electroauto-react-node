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
    console.log(preferences)
  
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
                                    <th><h6>Comprador</h6></th>
                                    <th><h6>Fecha</h6></th>
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
                style={{
                    overlay: {
                        background: 'rgba(0,0,0,.6)',
                        backdropFilter: 'blur(5px)'
                    },
                    content: {
                        width: '90%',
                        height: '70%',
                        margin: '0 auto',
                        marginTop: '0',
                        border: 'none',
                        background: 'rgba(256,256,256,1',
                        boxShadow: '0px 0px 20px rgba(0,0,0,.7)',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '6px',
                        outline: 'none',
                        padding: '0px 10px',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        paddingBottom: '30px',
                        position: 'relative',
                        left: '0vw',
                        top: '100px',
                        }
                    }}
            >
                <button style={{ width:'97%', textAlign:'right', padding:'0', background:'transparent', fontWeight:'700',fontSize:'20px', color:'#111', marginTop:'10px'}} onClick={closeModal}>x</button>
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
      </Modal>

      <Modal
        isOpen={infoEnvioModalIsOpen}
        onRequestClose={closeInfoEnvioModal}
        contentLabel="Info Envio Modal"
      >
        {currentInfoEnvio && (
          <div>
            <button style={{ width:'97%', textAlign:'right', padding:'0', background:'transparent', fontWeight:'700',fontSize:'20px', color:'#111', marginTop:'10px'}} onClick={closeInfoEnvioModal}>x</button>
            <p>Ciudad: {currentInfoEnvio.ciudad}</p>
            <p>Provincia: {currentInfoEnvio.provincia}</p>
            <p>Código Postal: {currentInfoEnvio.codigoPostal}</p>
            <p>Calle: {currentInfoEnvio.calle}</p>
            <p>Número: {currentInfoEnvio.numero}</p>
            <p>Piso: {currentInfoEnvio.piso}</p>
            <p>Departamento: {currentInfoEnvio.departamento}</p>
            <p>Observaciones: {currentInfoEnvio.observaciones}</p>
          </div>
        )}
      </Modal>
        </div>
  );
};

export default Ventas;
