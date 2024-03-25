const { crearProductoCarrito } = require("../services/carritoService");

const postProductoCarrito = async (req, res) => {
  try {
    const { id, name, detalle, precio, categoria, cantidad, imagen } = req.body;

    const nuevoProducto = await crearProductoCarrito({
      id,
      name,
      detalle,
      precio,
      categoria,
      cantidad,
      imagen,
    });

    return res.status(201).json({ success: true, producto: nuevoProducto });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({ success: false, error: 'Error al crear el producto' });
  }
};

module.exports = postProductoCarrito;
