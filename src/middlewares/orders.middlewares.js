const jwt = require('jsonwebtoken');
const orders = require('../models/orders.models')
const products = require('../models/products.models')
const payments = require('../models/payments.models')

const validateRequest = async (req, res, next) => {
    try {
        const { order, methodOfPayment } = req.body;
        for (let i = 0; i < order.length; i++) {
            productExist = await products.exists({ name: order[i].product })
            if (!productExist) return res.status(404).send("a product entered does not exist. Check the product list")
        }

        paymentExist = await payments.exists({ method: methodOfPayment })
        if (!paymentExist) return res.status(404).send("the payment method does not exist")

        next()
    } catch (err) {
        res.status(404).send("an unexpected error has occurred")
    }
}

const validateChanges = async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)
    const idUser = decoded.id

    try {
        const { order, methodOfPayment } = req.body

        const orderUser = await orders.findOne({ idUser: idUser });  //({ idUser: idUser, state: "new" })

        for (let i = 0; i < order.length; i++) {
            productExist = await products.exists({ name: order[i].product })
            if (!productExist) return res.status(404).send("a product entered does not exist. Check the product list")
        }

        paymentExist = await payments.exists({ method: methodOfPayment })
        if (!paymentExist) return res.status(404).send("the payment method does not exist")

        if (order.methodOfPayment == orderUser.methodOfPayment && order == orderUser.order) return res.status(404).json('you have not made any changes') //esto se deberia arreglar cuando saques el _id
        
        next()
    } catch (err) {
        res.status(404).json("an unexpected error has occurred")
    }
}


module.exports = {
    validateRequest,
    validateChanges
}
