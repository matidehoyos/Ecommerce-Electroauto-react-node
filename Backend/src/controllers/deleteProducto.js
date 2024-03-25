const { eliminarProducto } = require("../services/productoService");


const deleteProducto = async (req, res) => {
    try {
        const productoId = req.params.productoId;

        const producto = await eliminarProducto(productoId);
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
}

module.exports = deleteProducto;