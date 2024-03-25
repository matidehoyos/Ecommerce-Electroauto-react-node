const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const session = require('express-session')

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type'); 
   res.header('Access-Control-Allow-Credentials', true); // Habilitar credenciales
   next();
});

server.use(router);



module.exports = server; 