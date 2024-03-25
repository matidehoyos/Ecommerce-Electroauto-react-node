const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('User', {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  compra: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  suspended: {
    type: DataTypes.STRING,
    defaultValue: 'false',
  },
  banned: {
    type: DataTypes.STRING,
    defaultValue: 'false',
  },
});
}
