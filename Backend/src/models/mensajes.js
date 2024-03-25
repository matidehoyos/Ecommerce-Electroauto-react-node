const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('Mensajes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
 leido: {
  type: DataTypes.STRING,
  defaultValue: 'NO'
 }
});
}
