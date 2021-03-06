const jwt = require('jsonwebtoken')
const orders = require('../models/orders.models')
const products = require('../models/products.models')

const createOrder = async (req, res) => {
  const { order, methodOfPayment, shippingAddress } = req.body

  const price = await getPrice(order, res)
  const description = await getDescription(req, res)
  const idUser = getIdUser(req)

  const newOrder = {
    idUser: idUser,
    order: order,
    price: price,
    methodOfPayment: methodOfPayment,
    description: description,
    shippingAddress: shippingAddress
  }
  const charge = new orders(newOrder)
  const response = await charge.save()
  return response
}

const modifyOrder = async (req, res) => {
  const { order, methodOfPayment, shippingAddress } = req.body

  const idUser = getIdUser(req)
  const filter = { idUser: idUser, state: 'new' }

  const price = await getPrice(order, res)
  const description = await getDescription(req, res)

  const update = {
    order: order,
    price: price,
    methodOfPayment: methodOfPayment,
    description: description,
    shippingAddress: shippingAddress
  }
  await orders.findOneAndUpdate(filter, update)
}

let count = 1
const confirmOrder = async (req) => {
  const idUser = getIdUser(req)

  const date = getDate(req)
  const number = `#${count++}`

  const filter = { idUser: idUser, state: 'new' }
  const update = { state: 'confirmed', number: number, date: date }

  await orders.findOneAndUpdate(filter, update)
}

const cancellationOrder = async (req) => {
  const idUser = getIdUser(req)
  
  const filter = { idUser: idUser, state: 'new' }
  const update = { state: 'cancelled' }

  await orders.findOneAndUpdate(filter, update)
}

const getHistory = async (req) => {
  const idUser = getIdUser(req)

  const response = await orders.find({ idUser: idUser })
  return response
}

const getAllOrders = () => orders.find()

const changeOrderStatus = async (req) => {
  const { state } = req.body
  const idOrder = req.params.idOrder

  const filter = { _id: idOrder }
  const update = { state: state }

  await orders.findOneAndUpdate(filter, update)
}

const getIdUser = (req) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET)
  const idUser = decoded.id

  return idUser
}

const getDate = () => {
  const now = new Date()
  const date = `${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()}`
  
  return date
}

const getDescription = async (req, res) => {
  try {
    const { order } = req.body
    let description = ''

    for (let i = 0; i < order.length; i++) {
      const product = await products.findOne({ name: order[i].name })
      const info = `${order[i].amount}x${product.abbreviation}`

      description += info
    }
    return description
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

const getPrice = async (order, res) => {
  try {
    let price = 0

    for (let i = 0; i < order.length; i++) {
      const product = await products.findOne({ name: order[i].name })
      const productPrice = product.price
      const amount = order[i].amount
      price += amount * productPrice

      order[i].price = productPrice
    }
    return price
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

module.exports = {
  createOrder,
  modifyOrder,
  getHistory,
  getAllOrders,
  confirmOrder,
  changeOrderStatus,
  cancellationOrder
}
