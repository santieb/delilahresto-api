const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaProduct = new Schema({
    name: String,
    price: Number,
});


const products = mongoose.model('products', schemaProduct);

module.exports = { products, schemaProduct, }