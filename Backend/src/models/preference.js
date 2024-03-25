const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('Preference', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
estado: {
    type: DataTypes.STRING,
    defaultValue: "Producción"
},
email: {
    type: DataTypes.STRING,
    required: true
},
preferenceId: {
    type: DataTypes.STRING
},
envio: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
infoMp: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
});
}