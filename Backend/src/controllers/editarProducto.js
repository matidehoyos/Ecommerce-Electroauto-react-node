const { updateProducto } = require("../services/productoService")


const editarProducto = async (req, res) => {
    try {
        const { id, name, detalle, precio, categoria, cantidad, imagen } = req.body
        const response = await updateProducto(id, {
            name,
            detalle,
            precio,
            categoria,
            cantidad,
            imagen
        })

        res.status(200).json(response)

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = editarProducto
