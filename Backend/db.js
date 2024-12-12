const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require("dotenv").config();

const { DATABASE_URL, NODE_ENV } = process.env;

if (!DATABASE_URL) {
  throw new Error("La variable de entorno DATABASE_URL no está definida.");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: NODE_ENV === 'development' ? console.log : false, 
  native: false, 
});

const modelsPath = path.join(__dirname, '/src/models');
const modelDefiners = [];

fs.readdirSync(modelsPath)
  .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(modelsPath, file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([key, value]) => [
  key[0].toUpperCase() + key.slice(1),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Productos, Categorias, User, Carrito, Mensajes, Preference, Reviews } =
  sequelize.models;

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente con la base de datos.');

    if (NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Modelos sincronizados con la base de datos.');
    }
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
    throw error; 
  }
};

initDB();

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
