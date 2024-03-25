import { Link } from "react-router-dom";
import style from "./ReviewsButton.module.css";



export default function ReviewsButton() {
    return(
     <div className={style.container}>
        <Link to="/reviews">
            <button className={style.boton}>Ver todas las reseñas</button>
       </Link>
     </div>
    )
}