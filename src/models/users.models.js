const mongoose = require("../config/db.config");
const { Schema } = mongoose;

const userScheme = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }, // cambiar por roles
});

const users = mongoose.model("users", userScheme);

module.exports = users;