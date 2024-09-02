const  { findCategorias } = require("../services/categoriaService");

const getCategorias = async (req, res) => {
  try {
    const categorias = await findCategorias();
    return res.status(201).json(categorias);
  } catch (error) {
    console.error('Error al obtener categorias:', mesagge.error);
    res.status(500).json({ error: 'Error al obtener categorias, ', error });
  }
};

module.exports = getCategorias;