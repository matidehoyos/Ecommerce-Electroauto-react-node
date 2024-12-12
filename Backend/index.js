require("dotenv").config();
const server = require("./server");
const router = require("./src/routes/index");
require("./db"); 

const PORT = process.env.PORT || 3000;

server.use(router);
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(`[Error] ${status} - ${message}`);
  res.status(status).json({ error: message });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});




