import axios from "axios"


const mensajesProvider = {

    
    async postMensajes(mensaje) {
        try {
            const newMensaje = await axios.post(`/mensajes`, mensaje)
            return newMensaje
        } catch (error) {
            return error.message
        }
    },
    
    async getMensajes() {
        try {
            const mensajes = await axios(`/mensajes`)
            return mensajes
        } catch (error) {
            return error.message
        }
    },
    
    async marcarLeido(id) {
        try {
            const response = await axios.put(`/mensajes/${id}`, {
                leido: 'Si'
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    
    async eliminarMensaje(id) {
        try {
            const mensaje = await axios.delete(`/mensajes/${id}`)
            return mensaje;
        } catch (error) {
            return error.message
        }
    },
}

    export default mensajesProvider