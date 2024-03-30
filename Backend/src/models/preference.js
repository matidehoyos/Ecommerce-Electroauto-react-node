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
},
email: {
    type: DataTypes.STRING,
    required: true
},
infoEnvio: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
preferenceId: {
    type: DataTypes.STRING,
},
infoMp: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
});
}