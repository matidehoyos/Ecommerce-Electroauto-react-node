const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'https://electroauto.vercel.app');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type'); 
   res.header('Access-Control-Allow-Credentials', true); // Habilitar credenciales
   next();
});




module.exports = server; 