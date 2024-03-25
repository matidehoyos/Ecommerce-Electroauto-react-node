const { findProductoByName } = require("../services/productoService")

const getProductoByName = async (req, res) => {
    try {
        const { name } = req.params;
        const producto = await findProductoByName(name)
        if (producto.length > 0) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'No se encontraron productos con ese nombre.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getProductoByName