const mongoose = require('../config/db.config')
const findOrCreate = require('mongoose-findorcreate')
const { Schema } = mongoose

const userScheme = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  name: { type: String },
  phone: { type: Number },
  addressBook: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  facebookId: { type: String, unique: true },
  googleId: { type: String, unique: true },
  githubId: { type: String, unique: true },
  linkedinId: { type: String, unique: true }
},
{
  timestamps: true
}
)

userScheme.plugin(findOrCreate)

const users = mongoose.model('users', userScheme)

module.exports = users
