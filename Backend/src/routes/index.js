const { Router } = require('express');
const postProducto = require('../controllers/postProducto');
const postUser = require('../controllers/postUser');
const getProductos = require('../controllers/getProductos');
const deleteProducto = require('../controllers/deleteProducto');
const getUsers = require('../controllers/getUsers');
const postProductoCarrito = require('../controllers/postProductoCarrito');
const postMensaje = require('../controllers/postMensaje');
const getMensaje = require('../controllers/getMensaje');
const getProductoByName = require('../controllers/getProductoByName');
const getProductoByCategory = require('../controllers/getProductoByCategory');
const editMensaje = require('../controllers/editMensaje');
const getProductoById = require('../controllers/getProductoById');
const editarProducto = require('../controllers/editarProducto');
const getPaymentMP = require('../controllers/getPaymentMP');
const createPreferenceId = require('../controllers/createPreferenceId');
const postPreference = require('../controllers/postPreference');
const getPreferenceByPreferenceId = require('../controllers/getPreferenceById');
const getPreferenceById = require('../controllers/getPreferenceById');
const getPreferences = require('../controllers/getPreferences');
const deleteMensaje = require('../controllers/deleteMensaje');
const getUserByEmail = require('../controllers/getUserByEmail');
const editPreference = require('../controllers/editPreference');
const getReviews = require('../controllers/getReviews');
const postReviews = require('../controllers/postReviews')
const getPreferenceId = require('../controllers/getPreferenceId');
const editarEnvio = require('../controllers/editarEnvio');


const router = Router();

router.post('/productos', postProducto);
router.get('/productos', getProductos);
router.post('/user', postUser);
router.get('/productos/:id', getProductoById);
router.delete('/productos/:productoId', deleteProducto);
router.delete('/mensajes/:mensajeId', deleteMensaje);
router.post("/createPreference", createPreferenceId);
router.post("/postPreference", postPreference);
router.get('/users', getUsers);
router.get('/users/:email', getUserByEmail);
router.post('/carrito', postProductoCarrito);
router.post('/mensajes', postMensaje);
router.get('/mensajes', getMensaje);
router.put('/mensajes/:id', editMensaje);
router.put('/preferences/:id', editPreference);
router.get('/productos/name/:name', getProductoByName);
router.get('/productos/category/:category', getProductoByCategory);
router.put('/productos', editarProducto);
router.put('/putEnvio', editarEnvio);
router.get('/successpayment', getPaymentMP);
router.get('/getpreference/id', getPreferenceById);
router.get('/preferences', getPreferences);
router.get('/getpreferenceid', getPreferenceId);
router.get('/reviews', getReviews);
router.post('/reviews', postReviews);




module.exports = router;
