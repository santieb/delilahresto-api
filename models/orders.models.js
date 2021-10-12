const mongoose = require('../config/db.config');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schemaProduct = new Schema({
  name: String,
  price: Number,
});

const schemaOrders = new Schema({
  //idUser: ObjectId,
  order: [
    {
      product: schemaProduct,
      amount : Number
    }
  ],
  //state: ObjectId, //
  //methodOfPayment: ObjectId, //
  //price: Number,
  //time: String, 
  //shippingAddress: String, //tiene que ser enbebido
});


const orders = mongoose.model('orders', schemaOrders);

module.exports = orders;