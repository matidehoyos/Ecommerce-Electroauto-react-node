const { findProductoById } = require("../services/productoService")


const getProductoById = async(req, res) => {
  try {
    const {id} = req.params
    const proyectId = await findProductoById(id)
    res.status(200).json(proyectId)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getProductoById