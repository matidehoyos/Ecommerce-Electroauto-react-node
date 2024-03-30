const { Preference } = require("../../db.js");
const findAllPreferences = async () => {
    try {
        const preferences = await Preference.findAll();
        return preferences;
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

const createPreference = async (preference) => {
    try {
        const newPreference = await Preference.create(preference);
        return newPreference;
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

const findPreferenceById = async (id) => {
    try {
        const preference = await Preference.findByPk(id);
        return preference
    } catch (error) {
        throw new Error(error);
    }
}
const findPreferenceByEmail = async (email) => {
    try {
        const order = await Preference.findOne({ email:  email  });
        return order
    } catch (error) {
        throw new Error(error);
    }
}

const findPreferenceByPreferenceId = async (preference) => {
    try {
        const venta = await Preference.findOne({ where: { preferenceId: preference } });
        return venta
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}
const findPreferenceByIdPreference = async (id) => {
    try {
        const preference = await Preference.findOne({ where : { preferenceId : id}});
        return preference.dataValues
    } catch (error) {
        throw new Error(error);
    }
}

const findOrderByStatus = async (prop) => {
    try {
        const order = await Preference.findOne({ status: { prop } });
        return order
    } catch (error) {
        throw new Error(error);
    }
}

const editarEstadoPreference = async (id) => {
    try{
    const preference = await Preference.findByPk(id);
    if (!preference) {
      throw new Error('Preference no encontrado');
    }
    await preference.update({ estado: 'Enviado' });
    return preference; 
    } catch(error) {
        console.error(error)
    }};


    const updatePreferenceEnvio = async ({preferenceId, formDataEnvio}) =>  {
        try{
        const pref = await Preference.findOne( { where: {preferenceId: preferenceId}});
        if (!pref) {
          throw new Error('Preference no encontrado');
        }
        await pref.update({ infoEnvio: formDataEnvio });
        return pref; 
        } catch(error) {
            console.error(error)
        }};


const PutPreference = async (id, pay) => {
    try {
        const preference = await Preference.findByPk(id);
        if(!preference) {
            throw new Error('Preference no encontrada');
        }
        preference.infoMp = pay;
        await preference.save();
        console.log(preference.dataValues)
        return preference.dataValues;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {findAllPreferences, createPreference, findPreferenceById, updatePreferenceEnvio, findPreferenceByPreferenceId, findPreferenceByIdPreference, findOrderByStatus, PutPreference, editarEstadoPreference, findPreferenceByEmail}