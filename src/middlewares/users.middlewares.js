require('dotenv').config()
const users = require('../models/users.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const validateRequest = async (req, res, next) => {
  try {
    const { username, password, email, name, phone, addressBook } = req.body
    if (!username || !password || !email || !name || !phone || !addressBook) return res.status(404).json({ message: 'Fill in all the fields', status: 404 })

    const characters = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!characters.exec(email)) return res.status(404).json({ message: 'The email has invalid characters', status: 404 })

    const emailExists = await users.exists({ email: email })
    emailExists ? res.status(404).json({ message: 'The email is in use', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

const validateUpdate = async (req, res, next) => {
  try {
    const { username, email, name, phone, addressBook } = req.body
    const idUser = getIdUser(req)

    if (!username || !email || !name || !phone || !addressBook) return res.status(404).json({ message: 'Fill in all the fields', status: 404 })

    const characters = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!characters.exec(email)) return res.status(404).json({ message: 'The email has invalid characters', status: 404 })

    const emailUserExist = await users.exists({ email: email, _id: idUser })

    const emailExists = await users.exists({ email: email })

    !emailUserExist && emailExists ? res.status(404).json({ message: 'The email is in use', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(404).json({ message: 'Fill in all the fields', status: 404 })

    const user = await users.findOne({ email: email })

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) return res.status(404).json({ message: 'Password does not match', status: 404 })

    user.isSuspended ? res.status(404).json({ message: 'You are suspended, you cannot log in', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'Email address or password not found. Please try again', status: 404 })
  }
}

const validateUserID = async (req, res, next) => {
  try {
    const { idUser } = req.params
    console.log({"iduser": idUser})
    const user = await users.findOne({ _id: idUser })

    if (user.isAdmin) return res.status(404).json({ message: 'you cannot suspend an administrator', status: 404 })
    user.isSuspended ? res.status(404).json({ message: 'the user is already suspended', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'User id does not exist', status: 404 })
  }
}

const isAuthenticated = async (req, res, next) => {
  try {
    const idUser = getIdUser(req)
    const user = await users.findOne({ _id: idUser })
    user.isSuspended ? res.status(404).json({ message: 'You are suspended, you cannot access', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'Not authenticated', status: 404 })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const idUser = getIdUser(req)
    console.log(idUser)
    const adminExist = await users.exists({ _id: idUser, isAdmin: true })
    
    !adminExist ? res.status(404).json({ message: 'Not authorized', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'Not authorized', status: 404 })
  }
}

const getIdUser = (req) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET)
  const idUser = decoded.id
  return idUser
}

module.exports = {
  validateRequest,
  validateLogin,
  validateUserID,
  isAuthenticated,
  isAdmin,
  validateUpdate
}
