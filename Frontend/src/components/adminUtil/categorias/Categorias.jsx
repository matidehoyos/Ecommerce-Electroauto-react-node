import { useEffect, useState } from "react";
import categoriasProvider from "../../../utils/provider/categoriasProvider";
import style from "./Categorias.module.css";


const Categorias = () => {
    const [categorias, setCategorias] = useState([])
  

    const bringData = async () => {
        const categorias = await categoriasProvider.getCategorias();
        setCategorias(categorias.data);
    }

    useEffect(() => {
       bringData();
    }, []);


    

  return (
    <div className={style.container}>
        
        { !categorias?.length ? 
        <p className={style.noCategorias}>NO HAY CATEGORIAS AUN</p>
        :
            <div className={style.boxContainer}>
              <div className={style.titulo}>
                <h3>Todas las categorias</h3>
              </div>
              <div className={style.tablaCategorias}>
                    <table>
                        <thead>
                            <tr>
                                <th><h6>Nombre</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias?.map((categoria, index) => (
                                <tr key={index}>
                                    <td><h5>{categoria.name}</h5></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
            </div>
           }
    </div>
  );
};

export default Categorias;