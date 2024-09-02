import axios from "axios";

const categoriasProvider = {
  async postCategoria(categoria) {
    try {
      const newCategoria = await axios.post(`/categorias`, { name: categoria }); // Enviar como objeto
      return newCategoria;
    } catch (error) {
      return error.message;
    }
  },

  async getCategorias() {
    try {
      const categorias = await axios(`/categorias`);
      return categorias;
    } catch (error) {
      return error.message;
    }
  },
};

export default categoriasProvider;
