const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaUser = new Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    phone: Number,
    shippingAddress: String,
    isAdmin: Boolean,
});


const users = mongoose.model('users', schemaUser);

module.exports = users;