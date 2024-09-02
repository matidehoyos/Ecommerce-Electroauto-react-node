const { Sequelize } = require("sequelize");
const { Categorias } = require("../../db.js");

const findCategorias = async () => {
    try {
        return await Categorias.findAll();
    } catch (error) {
        console.error(error)
    }
}

const crearCategoria = async (form) => {
    try {
        const newCategoria = await Categorias.create(form);
        return newCategoria;
    } catch (error) {
        console.error(error)
    }
}



module.exports = { crearCategoria, findCategorias }