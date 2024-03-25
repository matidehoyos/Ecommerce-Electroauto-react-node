const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESTOKEN } = process.env;
mercadopago.configure({
  ACCESTOKEN
});

const createPreference = (carrito) => {
  let items = carrito.map(producto => ({
    title: producto.name,
    quantity: producto.unidades,
    currency_id: 'ARS', 
    unit_price: producto.precio
  }));

  let preference = {
    items,
    back_urls: {
      success: 'http://localhost:5173/success',
      failure: 'http://localhost:5173/failure',
      pending: 'http://localhost:5173/pending'
    }
  };

  return mercadopago.preferences.create(preference);
};
