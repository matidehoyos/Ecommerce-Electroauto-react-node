const { Preference } = require("./db");

const deleteAllRecords = async () => {
  try {
    await Preference.truncate();
    console.log('Todos los registros han sido eliminados correctamente');
  } catch (error) {
    console.error('Error al eliminar los registros:', error);
  }
};

deleteAllRecords();
