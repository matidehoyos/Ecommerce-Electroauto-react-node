const { MercadoPagoConfig, Preference } = require('mercadopago');
const { createPreference } = require('../services/preferenceService');

const client = new MercadoPagoConfig({ accessToken: 'TEST-1187084560697921-031218-7d2dd2f5a242226389b04d63bbc09fb8-762669494' });


const createPreferenceId = async(req, res) => {
  try {
    const {items, email } = req.body;

  
   const body = {
      items: items,
      back_urls: {
        success: "https://electroauto.vercel.app/successpayment",
        failure: "https://electroauto.vercel.app/successpayment",
        pending: "https://electroauto.vercel.app/successpayment",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);

    try {
      const result = await preference.create({body});
      const obj = {
        estado: "Producción",
        email: email,
        infoEnvio: {},
        preferenceId: result.id,
        infoMp: {},
      }
      const newPreferenceBD = await createPreference(obj)
      return res.status(200).json({ id: result.id });  
    } catch (error) {
      console.log(error.message)
      console.error(error)
    } 
 
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  }
  
  module.exports = createPreferenceId


  

  