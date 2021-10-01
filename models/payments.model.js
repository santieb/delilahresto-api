const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaPayment = new Schema({
    method: String
});


const payments = mongoose.model('payments', schemaPayment);

module.exports = payments;