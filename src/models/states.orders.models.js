const mongoose = require('../config/db.config');
const { Schema } = mongoose;

const schemaPayment = new Schema({
    state: String
});


const orderStatuses = mongoose.model('order Statuses', schemaPayment);

module.exports = orderStatuses;