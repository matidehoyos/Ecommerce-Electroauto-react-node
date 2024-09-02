const { Categorias } = require("../../db.js");

const postCategoria = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: 'El campo "name" es requerido' });
    }

    const nuevaCategoria = await Categorias.create({ name });
    return res.status(201).json({ success: true, categoria: nuevaCategoria });
  } catch (error) {
    console.error('Error al crear categoria:', error);

    if (error instanceof SomeOperationalError) {
      return res.status(500).json({ success: false, error: 'Error operacional al crear categoria', details: error.message });
    }

    return res.status(500).json({ success: false, error: 'Error interno del servidor', details: error.message });
  }
};

module.exports = postCategoria;

