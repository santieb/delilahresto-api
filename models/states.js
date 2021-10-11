const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaPayment = new Schema({
    status: String
});


const orderStatuses = mongoose.model('order Statuses', schemaPayment);

module.exports = payments;