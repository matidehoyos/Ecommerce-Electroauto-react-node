const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('Productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.TEXT,
    allowNull: false
  }, 
  informacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
 
});
}
