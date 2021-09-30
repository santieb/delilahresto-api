require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_PORT = process.env.MONGODB_PORT;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

const conectionString = `mongodb://localhost:27017/restaurant`;
//const conectionString = `mongodb://localhost:27017/restaurant`;

mongoose.connect(conectionString, options);

module.exports = mongoose
