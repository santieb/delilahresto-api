const mongoose = require('../config/db.config')
const findOrCreate = require('mongoose-findorcreate')
const { Schema } = mongoose

const userScheme = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  name: { type: String },
  phone: { type: Number },
  addressBook: [
    {
      shippingAddress: { type: String }
    }
  ],
  isAdmin: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false }
},
{
  timestamps: true
}
)

userScheme.plugin(findOrCreate)

const users = mongoose.model('users', userScheme)

module.exports = users
