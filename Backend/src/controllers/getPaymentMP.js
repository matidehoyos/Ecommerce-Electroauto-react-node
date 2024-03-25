const { findPreferenceByIdPreference, PutPreference, } = require("../services/preferenceService");
require('dotenv').config();
const { ACCESTOKEN } = process.env;
const axios = require("axios");
const { updateUser, findUserByEmailMP } = require("../services/userService");




const getPaymentMP = async (req, res) => {
  try {
    const { payment_id, preference_id} = req.query;

    const searchPayment = await findPreferenceByIdPreference(preference_id);

    if (!payment_id) {
      res.status(400).json({ error: 'payment_id parameter is missing' });
      return;
    }

    const payAidi = await axios(
      `https://api.mercadopago.com/v1/payments/${payment_id}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESTOKEN}`,
        },
      }
    );

    const pay = {
      emailMp: payAidi.data.payer.email,
      payId: payment_id,
      date_approved: payAidi.data.date_approved,
      date_created: payAidi.data.date_created,
      status: payAidi.data.status,
      payment_method_id: payAidi.data.payment_method_id,
      payment_type_id: payAidi.data.payment_type_id,
      productos: payAidi.data.additional_info.items,
      totalPaid: payAidi.data.transaction_amount
    }

    const newOrder = await PutPreference(searchPayment.id, pay);

    const preferenceUser = {
      compra: searchPayment.carrito,
      preferenceId: searchPayment.preferenceId,
      payId: searchPayment.payId,
      emailMp: searchPayment.emailMp,
      date_approved: searchPayment.date_approved,
      date_created: searchPayment.date_created,
      status: searchPayment.status,
      payment_method_id: searchPayment.payment_method_id,
      payment_type_id: searchPayment.payment_type_id,
    }


    const user = await findUserByEmailMP(searchPayment.email)
    const userUpdate = await updateUser(user.id, preferenceUser)


    {/*const mailer = {
      title: searchPayment.title,
      email: searchPayment.email,
      payId: payment_id,
      date: payAidi.data.date_approved,
      status: payAidi.data.status,
      paymentType: payAidi.data.payment_type_id,
      paymentMethod: payAidi.data.payment_method_id,
      compra: searchPayment.carrito,
      amount: searchPayment.amount
    }

    if (payAidi.data.status === "approved") {
      mailApprovedMP(mailer);
    }

    else if (payAidi.data.status === "in_process") {
      mailRejectedMP(mailer);
    } */}

    res.status(200).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

module.exports = getPaymentMP;