const mongoose = require("../config/db.config");
const { Schema } = mongoose;

const paymentScheme = new Schema({
    method: { type: String, required: true }
});


const payments = mongoose.model("payments", paymentScheme);

module.exports = payments;
