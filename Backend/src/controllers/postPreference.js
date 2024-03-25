const { createPreference } = require("../services/preferenceService");


const postPreference = async (req, res) => {
  try {
    const { name, detalle, precio, categoria, cantidad, imagen} = req.body;

    const newPreference = await createPreference({
      name,
      detalle,
      precio,
      categoria,
      cantidad, 
      imagen,
    });

    return res.status(201).json({ success: true, preference: newPreference });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({ success: false, error: 'Error al crear la preferencia' });
  }
};

module.exports = postPreference;
