const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaPayment = new Schema({
    method: {
        type: String,
        required: true
    } 
});

const payments = mongoose.model('payments', schemaPayment);


module.exports = payments;