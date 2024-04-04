import { useState } from "react";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";


export default function SearchBar() {
   const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSearch = async(e) => {
        try {
            e.preventDefault();
            navigate(`/${input}`);
            setInput("");
        } catch (error) {
            console.error(error)
        }
    }
    
    return(
        <div className={style.container}>
           <input name="search" 
                   type="text"
                   value={input}
                   onChange={handleInputChange} 
                   placeholder="Busque aqui su producto..." 
                   className={style.input}
                   />    
        <button className={style.button} onClick={handleSearch}>BUSCAR</button>
      </div>
    )
}