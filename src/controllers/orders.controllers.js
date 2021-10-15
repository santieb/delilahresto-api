const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const orders = require('../models/orders.models');
const products = require('../models/products.models')

let count = 1;

const createOrder = async (req, res) => {

    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)
    const idUser = decoded.id

    const { order, methodOfPayment } = req.body

    const price = await getPrice(order, res)
    const description = await getDescription(req, res)

    count++
    const number = `#${count}`

    date = new Date()
    const hour =`${date.getHours()}:${date.getMinutes()}`

    const newOrder = {
        idUser: idUser,
        order: order,
        price: price,
        methodOfPayment: methodOfPayment,
        number: number,
        description: description,
        hour: hour
    };

    const ordera = new orders(newOrder);
    const response = await ordera.save();
    return response;
};

const getHistory = (req) => { //quitar ids y datos que no le sirven al usuario

    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)

    response = orders.find({ idUser: decoded.id })
    return response
}

const getAllOrders = () => orders.find()


const getDescription = async (req, res) => {
    try {
        const { order } = req.body;
        let description = "";

        for (i = 0; i < req.body.order.length; i++) {
            const product = await products.findOne({ name: order[i].product })
            const info = `${order[i].amount}x${product.abbreviation} `

            description += info;
        }
        return description
    } catch {
        res.send("error")
    }
}


const getPrice = async (order, res) => {
    try {
        let price = 0

        for (i = 0; i < order.length; i++) {
            const product = await products.findOne({ name: order[i].product })
            let productPrice = product.price
            let amount = order[i].amount
            price += amount * productPrice

            order[i].productPrice = productPrice;
        }
        return price
    } catch {
        res.send("error")
    }
}


module.exports = {
    createOrder,
    getHistory,
    getAllOrders,
}


