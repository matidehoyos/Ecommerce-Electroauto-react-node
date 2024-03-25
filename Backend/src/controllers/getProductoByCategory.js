const { findProductoByCategory } = require("../services/productoService")

const getProductoByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const producto = await findProductoByCategory(category)
        if (producto.length > 0) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'No se encontraron productos con ese nombre.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getProductoByCategory