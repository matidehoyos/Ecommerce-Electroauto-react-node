require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(
   "postgresql://postgres:EQrvjNteygMkNDXFtmqOApICfeYGUcvp@monorail.proxy.rlwy.net:37297/railway", {
      dialect: 'postgres', 
      protocol: 'postgres',
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false 
         }
      },
      logging: false, 
      native: false
   });
  
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/src/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, './src/models/', file)));
   });


modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const { Productos, User, Carrito, Mensajes, Preference, Reviews } = sequelize.models;


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente con la base de datos.');
    await sequelize.sync(); 
    console.log('Modelos sincronizados correctamente con la base de datos.');
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
  }
})();



module.exports = {
   ...sequelize.models, 
   conn: sequelize, 
};
