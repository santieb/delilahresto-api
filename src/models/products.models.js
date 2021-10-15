const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const productScheme = new Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    price: { type: Number, required: true },
});


const products = mongoose.model('products', productScheme);

module.exports = products