const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const cors = require('cors');
require('./db.js');
const PORT = 3000;

const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type'); 
   res.header('Access-Control-Allow-Credentials', true); // Habilitar credenciales
   next();
});


server.use("/",routes);

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}` );
})
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;



