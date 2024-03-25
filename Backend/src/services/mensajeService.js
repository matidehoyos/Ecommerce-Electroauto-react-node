const { Mensajes } = require("../../db.js");

const findMensaje = async () => {
    try {
        return await Mensajes.findAll();
    } catch (error) {
        throw new Error(error);
    }
}

const postMensajes = async (form) => {
    try {
        const newMensaje = await Mensajes.create(form);
        return newMensaje;
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarMensaje = async (id) => {
    try {
        const Mensaje = await Mensajes.findByPk(id);
        if (!Mensaje) {
            throw new Error('Mensaje no encontrado');
        }
        await Mensaje.destroy();
        return Mensaje;
    } catch (error) {
        throw new Error(error);
    }
}

const marcarComoLeido = async (id) => {
    const mensaje = await Mensajes.findByPk(id);
    if (!mensaje) {
      throw new Error('Mensaje no encontrado');
    }
    await mensaje.update({ leido: 'Si' });
    return mensaje;
  };


module.exports = { postMensajes, eliminarMensaje, findMensaje, marcarComoLeido }
