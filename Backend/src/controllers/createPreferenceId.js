const { MercadoPagoConfig, Preference } = require('mercadopago');
const { createPreference } = require('../services/preferenceService');
require('dotenv').config();
const { ACCESTOKEN } = process.env;

const client = new MercadoPagoConfig({ ACCESTOKEN });



const createPreferenceId = async(req, res) => {
  try {
    const { items, email } = req.body;
  
   const body = {
      items: items,
      back_urls: {
        success: "http://localhost:5173/successpayment",
        failure: "http://localhost:5173/successpayment",
        pending: "http://localhost:5173/successpayment",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);

    try {
      const result = await preference.create({body});
      const obj = {
        email: email,
        preferenceId: result.id,
      }

      const newPreferenceBD = await createPreference(obj)
      console.log('posteado bien', newPreferenceBD)
      res.status(200).json({ id: result.id });
    } catch (error) {
      console.error(error);
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
  }
  
  module.exports = createPreferenceId

  

  