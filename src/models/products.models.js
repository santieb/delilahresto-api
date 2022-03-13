const mongoose = require('../config/db.config')
const { Schema } = mongoose

const productScheme = new Schema({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true },
  price: { type: Number, required: true },
  imgURL: { type: String, default: "https://i.imgur.com/GYipReG.png" },
  description: { type: String, required: true },
},
{
  timestamps: true
}
)

const products = mongoose.model('products', productScheme)

module.exports = products
