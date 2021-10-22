const jwt = require('jsonwebtoken');
const orders = require('../models/orders.models')
const products = require('../models/products.models')
const payments = require('../models/payments.models')
const orderStates = require('../models/orderStates.models')
const users = require('../models/users.models')

const validateRequest = async (req, res, next) => {
    try {
        const { order, methodOfPayment, shippingAddress } = req.body

        const idUser = getIdUser(req)
        const orderUser = await orders.findOne({ idUser: idUser, state: "new" })

        if (orderUser) return res.status(404).json({ msg: 'You already have a pending order, confirm the order to create another', status: 404 })

        for (let i = 0; i < order.length; i++) {
            const productExist = await products.exists({ name: order[i].product })
            if (!productExist) return res.status(404).json({ msg: 'A product entered does not exist. Check the product list', status: 404 })
        }

        const shippingAddressExist = await users.exists({ _id: idUser, $and: [{ 'addressBook.shippingAddress': { $eq: shippingAddress } }] })
        if (!shippingAddressExist) return res.status(404).json({ msg: 'The shipping address does not exist in your list. Add to your list', status: 404 })

        const paymentExist = await payments.exists({ method: methodOfPayment })
        !paymentExist ? res.status(404).json({ msg: 'The payment method does not exist. Check the methods of payments list', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
}

const validateChanges = async (req, res, next) => {
    try {
        const { order, methodOfPayment, shippingAddress } = req.body

        const idUser = getIdUser(req)
        const orderUser = await orders.findOne({ idUser: idUser, state: "new" })

        if (!orderUser) return res.status(404).json({ msg: 'You do not have any new orders that you can edit', status: 404 })

        for (let i = 0; i < order.length; i++) {
            const productExist = await products.exists({ name: order[i].product })
            if (!productExist) return res.status(404).json({ msg: 'A product entered does not exist. Check the product list', status: 404 })
        }

        const paymentExist = await payments.exists({ method: methodOfPayment })
        if (!paymentExist) return res.status(404).json({ msg: 'The payment method does not exist. Check the methods of payments list', status: 404 })

        const shippingAddressExist = await users.exists({ _id: idUser, $and: [{ 'addressBook.shippingAddress': { $eq: shippingAddress } }] })
        if (!shippingAddressExist) return res.status(404).json({ msg: 'The shipping address does not exist in your list. Add to your list', status: 404 })

        if (methodOfPayment == orderUser.methodOfPayment && order == orderUser.order && shippingAddress == order.shippingAddress) res.status(404).json({ msg: 'You have not made any changes', status: 404 })

        next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
}

const validateConfirmation = async (req, res, next) => {
    try {
        const idUser = getIdUser(req)
        const orderUser = await orders.findOne({ idUser: idUser, state: "new" })
        !orderUser ? res.status(404).json({ msg: 'You do not have any new order to be confirmed', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
}

const validateState = async (req, res, next) => {
    try {
        const { state } = req.body

        const idOrder = req.params.idOrder;
        const order = await orders.findOne({ _id: idOrder })
        if (order.state === state) res.status(404).json({ msg: 'you have not made any changes', status: 404 })

        if (order.state === "new") res.status(404).json({ msg: 'You cannot change an order in new condition. has to be confirmed', status: 404 })

        if (state === "new") res.status(404).json({ msg: 'you cannot change the status to new', status: 404 })

        const stateExist = await orderStates.exists({ state: state })
        stateExist ? next() : res.status(404).json({ msg: 'the entered state does not exist', status: 404 })
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
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
    validateChanges,
    validateConfirmation,
    validateState
}
