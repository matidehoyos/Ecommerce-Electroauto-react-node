const server = require("./server.js");
require('./db.js');
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}` );
})
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});




