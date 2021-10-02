const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaProduct = new Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    phone: Number,
    shippingAddress: String,
    isAdmin: Boolean,
    loggedIn: Boolean,
});


const products = mongoose.model('products', schemaProduct);

module.exports = products;