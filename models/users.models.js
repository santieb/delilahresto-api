const mongoose = require('../src/config/db.config');
const { Schema } = mongoose;

const schemaUser = new Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    phone: Number,
    shippingAddress: String,
    isAdmin: Boolean, // cambiar por roles
});


const users = mongoose.model('users', schemaUser);

module.exports = users;