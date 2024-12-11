import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import style from "./SearchBar.module.css";

export default function SearchBar() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => setInput(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate(`/${input}`);
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.container}>
            <input
                name="search"
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Busque aquí su producto..."
                className={style.input}
                autoComplete="off"
            />
            <button type="submit" className={style.button} aria-label="Buscar">
                <FaSearch />
            </button>
        </form>
    );
}
