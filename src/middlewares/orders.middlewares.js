const jwt = require('jsonwebtoken');
const orders = require('../models/orders.models')
const products = require('../models/products.models')
const payments = require('../models/payments.models')
const orderStates = require('../models/orderStates.models');
const users = require('../models/users.models');

const validateRequest = async (req, res, next) => {
    try {
        const { order, methodOfPayment, shippingAddress } = req.body;

        const idUser = getIdUser(req)
        const orderUser = await orders.findOne({ idUser: idUser, state: "new" });

        if (orderUser) return res.status(404).send("You already have a pending order, confirm the order to create another")

        for (let i = 0; i < order.length; i++) {
            const productExist = await products.exists({ name: order[i].product })
            if (!productExist) return res.status(404).send("a product entered does not exist. Check the product list")
        }

        const shippingAddressExist = await users.exists({'addressBook.shippingAddress': { $eq: shippingAddress }});
        if(!shippingAddressExist) return res.status(404).send("The shipping address does not exist in your list. Add to your list")

        const paymentExist = await payments.exists({ method: methodOfPayment })
        !paymentExist ? res.status(404).send("the payment method does not exist") : next()

    } catch {
        res.status(404).send("an unexpected error has occurred")
    }
}

const validateChanges = async (req, res, next) => {
    try {
        const { order, methodOfPayment, shippingAddress } = req.body
        
        const idUser = getIdUser(req)
        const orderUser = await orders.findOne({ idUser: idUser, state: "new" });

        if (!orderUser) return res.status(404).json('you do not have any new orders that you can edit')

        for (let i = 0; i < order.length; i++) {
            const productExist = await products.exists({ name: order[i].product })
            if (!productExist) return res.status(404).json("a product entered does not exist. Check the product list")
        }

        const paymentExist = await payments.exists({ method: methodOfPayment })
        if (!paymentExist) return res.status(404).json("the payment method does not exist")

        const shippingAddressExist = await users.exists( { addressBook: { $in: [ shippingAddress ] } } )
        if(!shippingAddressExist) return res.status(404).send("The shipping address does not exist in your list. Add to your list")

        if (methodOfPayment == orderUser.methodOfPayment && order == orderUser.order && shippingAddress == order.shippingAddress ) return res.status(404).json('you have not made any changes') //esto se deberia arreglar cuando saques el _id

        next()
    } catch {
        res.status(404).json("an unexpected error has occurred")
    }
}

const validateConfirmation = async (req, res, next) => {
    try {
        const idUser = getIdUser(req)
        const orderUser = await orders.findOne({ idUser: idUser, state: "new" });
        if (!orderUser) return res.status(404).json('you do not have any new order to be confirmed')
        next()
    } catch {
        res.status(404).json("an unexpected error has occurred")
    }
}

const validateState = async (req, res, next) => {
    try {
        const { state } = req.body

        const idOrder = req.params.idOrder;
        const order = await orders.findOne({_id: idOrder });
        if(order.state === state) res.status(404).json('you have not made any changes') 

        if(order.state === "new")  res.status(404).json('You cannot change an order in new condition. has to be confirmed')

        if(state === "new") res.status(404).json('you cannot change the status to new') 

        const stateExist = await orderStates.exists({ state: state })
        stateExist ? next() : res.status(404).json('the entered state does not exist') 
    } catch {
        res.status(404).json("an unexpected error has occurred")
    }
}


const getIdUser = (req) => {
    const token = req.headers.authorization.replace('Bearer ', '');
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
