const { Carrito } = require("../../db.js");

const findProductosCarrito = async () => {
    try {
        return await Carrito.findAll();
    } catch (error) {
        throw new Error(error);
    }
}

const crearProductoCarrito = async (form) => {
    try {
        const newProducto = await Carrito.create(form);
        return newProducto;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarProductoCarrito = async (id) => {
    try {
        const producto = await Carrito.findByPk(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        await producto.destroy();
        return producto;
    } catch (error) {
        throw new Error(error);
    }
}

const updateProductoCarrito = async (id, info) => {
    try {
        return await Carrito.findByIdAndUpdate(id, info);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = { crearProductoCarrito, eliminarProductoCarrito, findProductosCarrito, updateProductoCarrito }
