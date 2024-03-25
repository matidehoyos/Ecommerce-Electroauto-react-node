const { DataTypes, DATE, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('Reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.INTEGER,
    default: 5
  },
  message: {
    type: DataTypes.STRING,
    required: true
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
});
}
