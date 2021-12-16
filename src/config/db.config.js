require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

const uri = process.env.CLOUD_MONGODB;

mongoose.connect(uri);

module.exports = mongoose
