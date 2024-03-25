const { findProductos } = require("../services/productoService");

const getProductos = async (req, res) => {
  try {
    const productos = await findProductos();
    return res.status(201).json(productos);
  } catch (error) {
    console.error('Error al buscar el producto:', error);
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
};

module.exports = getProductos;