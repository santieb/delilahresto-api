const mongoose = require("../config/db.config");
const { Schema } = mongoose;

const orderStatusScheme = new Schema({
    state: { type: String, required: true }
});

const orderStatus = mongoose.model("orderStatus", orderStatusScheme);

module.exports = orderStatus;