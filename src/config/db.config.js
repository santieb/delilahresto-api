require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const conectionString = process.env.CLOUD_MONGODB

mongoose.connect(conectionString, options)

module.exports = mongoose