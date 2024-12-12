const { Router } = require("express");

const controllers = {
  postProducto: require("../controllers/postProducto"),
  getProductos: require("../controllers/getProductos"),
  deleteProducto: require("../controllers/deleteProducto"),
  getProductoById: require("../controllers/getProductoById"),
  getProductoByName: require("../controllers/getProductoByName"),
  getProductoByCategory: require("../controllers/getProductoByCategory"),
  editarProducto: require("../controllers/editarProducto"),
  postCategoria: require("../controllers/postCategoria"),
  getCategorias: require("../controllers/getCategorias"),
  postUser: require("../controllers/postUser"),
  getUsers: require("../controllers/getUsers"),
  postProductoCarrito: require("../controllers/postProductoCarrito"),
  postMensaje: require("../controllers/postMensaje"),
  getMensaje: require("../controllers/getMensaje"),
  editMensaje: require("../controllers/editMensaje"),
  deleteMensaje: require("../controllers/deleteMensaje"),
  createPreferenceId: require("../controllers/createPreferenceId"),
  postPreference: require("../controllers/postPreference"),
  getPreferences: require("../controllers/getPreferences"),
  getPreferenceById: require("../controllers/getPreferenceById"),
  editPreference: require("../controllers/editPreference"),
  getPaymentMP: require("../controllers/getPaymentMP"),
  getReviews: require("../controllers/getReviews"),
  postReviews: require("../controllers/postReviews"),
  editarEnvio: require("../controllers/editarEnvio"),
  getUserByEmail: require("../controllers/getUserByEmail"),
};

const router = Router();

router.post("/productos", controllers.postProducto);
router.get("/productos", controllers.getProductos);
router.get("/productos/:id", controllers.getProductoById);
router.get("/productos/name/:name", controllers.getProductoByName);
router.get("/productos/category/:category", controllers.getProductoByCategory);
router.put("/productos", controllers.editarProducto);
router.delete("/productos/:productoId", controllers.deleteProducto);

router.post("/categorias", controllers.postCategoria);
router.get("/categorias", controllers.getCategorias);

router.post("/user", controllers.postUser);
router.get("/users", controllers.getUsers);
router.get("/users/:email", controllers.getUserByEmail);

router.post("/carrito", controllers.postProductoCarrito);

router.post("/mensajes", controllers.postMensaje);
router.get("/mensajes", controllers.getMensaje);
router.put("/mensajes/:id", controllers.editMensaje);
router.delete("/mensajes/:mensajeId", controllers.deleteMensaje);

router.post("/preferences/create", controllers.createPreferenceId);
router.post("/preferences", controllers.postPreference);
router.get("/preferences", controllers.getPreferences);
router.get("/preferences/:id", controllers.getPreferenceById);
router.put("/preferences/:id", controllers.editPreference);

router.get("/reviews", controllers.getReviews);
router.post("/reviews", controllers.postReviews);

router.put("/envios", controllers.editarEnvio);

router.get("/successpayment", controllers.getPaymentMP);

module.exports = router;
