const jwt = require('jsonwebtoken')
const users = require('../models/users.models')

const validateAddress = async (req, res, next) => {
  try {
    const { address } = req.body
    if (!address) return res.status(404).json({ message: 'Fill in all the fields', status: 404 })
    const idUser = getIdUser(req)

    const user = await users.findOne({ _id: idUser })

    const addresses = user.addressBook
    const addressExist = (addresses.find(addresses => addresses.shippingAddress == address))
    addressExist ? res.status(404).json({ message: 'The shippingAddress already exists', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

const validateAddressParameter = async (req, res, next) => {
  try {
    const { shippingAddress } = req.params
    const idUser = getIdUser(req)

    const user = await users.findOne({ _id: idUser })

    const addresses = user.addressBook
    const idExist = (addresses.find(addresses => addresses.shippingAddress == shippingAddress))
    !idExist ? res.status(404).send({ message: 'that address does not exist', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'that address does not exist', status: 404 })
  }
}

const getIdUser = (req) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET)
  const idUser = decoded.id

  return idUser
}

module.exports = {
  validateAddress,
  validateAddressParameter
}
