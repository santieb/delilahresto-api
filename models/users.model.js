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


const users = mongoose.model('users', users);

module.exports = users;