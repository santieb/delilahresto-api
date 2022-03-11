require('dotenv').config()
const users = require('../models/users.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async (req) => {
  const { username, password, email, name, phone, addressBook } = req.body

  const passwordHash = await bcrypt.hash(password, 8)
  const newUser = {
    username: username,
    password: passwordHash,
    email: email,
    name: name,
    phone: phone,
    addressBook: addressBook
  }
  addIdentifiersAddresses(req)

  const user = new users(newUser)
  const response = await user.save()
  return response
}

const loginUser = async (req) => {
  const { email } = req.body

  const user = await users.findOne({ email: email }).select('-password -createdAt -updatedAt -__v -isSuspended -addressBook -username -cart -phone')
  const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })
  return {user, token}
}

const getUser = async (req) => {
  const idUser = getIdUser(req)
  const user = await users.findOne({_id: idUser})
  return user
}

const updateUser = async (req) => {
  const { username, password, email, name, phone, addressBook } = req.body
  const idUser = getIdUser(req)

  await users.findOneAndUpdate({_id: idUser}, {
    username: username,
    email: email,
    name: name,
    phone: phone,
    addressBook: addressBook
  })
  return
}

const updateCart = async (req, res) => {
  const { cart } = req.body
  const idUser = getIdUser(req)

  const filter = { _id: idUser }
  const update = { cart: cart }

  await users.findOneAndUpdate(filter, update)
}

const listUsers = async () => await users.find()

const suspendUser = async (req) => {
  const { idUser } = req.params

  const filter = { _id: idUser }
  const update = { isSuspended: true }

  await users.findOneAndUpdate(filter, update)
}

const addIdentifiersAddresses = async (req) => {
  const { addressBook } = req.body
  for (i = 0; i < addressBook.length; i++) {
    addressBook[i].id = i
  }
}

const getIdUser = (req) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET)
  const idUser = decoded.id
  return idUser
}

module.exports = {
  createUser,
  loginUser,
  updateCart,
  getUser,
  listUsers,
  suspendUser,
  updateUser
}
