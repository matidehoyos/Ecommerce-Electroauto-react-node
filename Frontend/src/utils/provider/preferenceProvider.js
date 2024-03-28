import axios from "axios"

const preferenceProvider = {
    async createPreference(obj) {
        try {
            const response = await axios.post(`/createpreferenceid`, obj)
            console.log(response)
            const {id} = response.data
            return id
        } catch (error) {
            console.error(error)
        }
    },
    async getPreferences() {
        try {
            const allPreferences = await axios.get(`/preferences`)
            return allPreferences
        } catch (error) {
            return error.message
        }
    },
    async getPreferenceById(obj) {
        try {
            const { data } = await axios.get(`/getpreference`, { params: obj })
            return data
        } catch (error) {
            return error.message
        }
    },
   
    async getPreferenceByPreferenceId(preferenceId) {
        try {
            const {  data } = await axios.get(`/getpreferenceid/${preferenceId}`)
            return data
        } catch (error) {
            return error.message
        }
    },
    async editarEstadoPreference(id) {
        try {
            const response = await axios.put(`/preferences/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }, async updateDatosEnvio(obj) {
        try {
            const datos = await axios.put(`/putEnvio`, obj)
            return datos
        } catch (error) {
            return error.message
        }
    },
    async refreshPayment(obj) {
        try {
            console.log(obj);
            const { data } = await axios.get(`/refreshpayment`, { params: obj })
            return data
        } catch (error) {
            return error.message
        }
    },
}

export default preferenceProvider