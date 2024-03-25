const { Sequelize } = require("sequelize");
const { Productos } = require("../../db.js");

const findProductos = async () => {
    try {
        return await Productos.findAll();
    } catch (error) {
        throw new Error(error);
    }
}


const findProductoById = async (id) => {
    try {
        return await Productos.findByPk(id);
    } catch (error) {
        throw new Error(error);
    }
}

const findProductoByName = async (name) => {

    try {
        const productos = await Productos.findAll({
            where: { 
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.iLike]: `%${name}%` } },
                    { categoria: { [Sequelize.Op.iLike]: `%${name}%` } }
                ]
             }
        });
        return productos;
    } catch (error) {
        console.error('Error al buscar el producto:', error.message);
    }
}

const findProductoByCategory = async (name) => {

    try {
        const productos = await Productos.findAll({
            where: { categoria: {[Sequelize.Op.iLike]: `%${categoria}%`} }
        });
        return productos;
    } catch (error) {
        console.error('Error al buscar el producto:', error.message);
    }
}
const crearProducto = async (form) => {
    try {
        const newProducto = await Productos.create(form);
        return newProducto;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarProducto = async (id) => {
    try {
        const producto = await Productos.findByPk(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        await producto.destroy();
        return producto;
    } catch (error) {
        throw new Error(error);
    }
}


const updateProducto = async (id, info) => {
    try {
        const producto = await Productos.findByPk(id);
        if(!producto) {
            throw new Error('Producto no encontrado');
        }
        await producto.update(info);
        return producto;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = { crearProducto, eliminarProducto, findProductos, findProductoByName, findProductoByCategory, findProductoById , updateProducto }

