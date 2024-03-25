const { crearProducto } = require("../services/productoService");

const postProducto = async (req, res) => {
  try {
    const { name, detalle,informacion, precio, categoria, cantidad, imagen} = req.body;

    const nuevoProducto = await crearProducto({
      name,
      detalle,
      informacion,
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

module.exports = postProducto;
