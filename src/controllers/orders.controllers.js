const jwt = require('jsonwebtoken');
const orders = require('../models/orders.models');
const products = require('../models/products.models')

let count = 1;

const createOrder = async (req, res) => {

    const { order, methodOfPayment } = req.body

    const price = await getPrice(order, res)
    const description = await getDescription(req, res)
    const idUser = getIdUser(req)
    const hour = getHour(req)
    count++
    const number = `#${count}`

    const newOrder = {
        idUser: idUser,
        order: order,
        price: price,
        methodOfPayment: methodOfPayment,
        description: description,
        number: number,
        hour: hour
    };

    const charge = new orders(newOrder);
    const response = await charge.save();
    return response;
};

const modifyOrder = async (req, res) => {

    const { order, methodOfPayment } = req.body

    const idUser = getIdUser(req)
    const filter = { idUser: idUser, state: "new" };

    const price = await getPrice(order, res)
    const description = await getDescription(req, res)

    const update = {
        order: order,
        price: price,
        methodOfPayment: methodOfPayment,
        description: description,
    };
    await orders.findOneAndUpdate(filter, update);
}

const confirmOrder = async (req) => {

    const idUser = getIdUser(req)
    const filter = { idUser: idUser, state: "new" };
    const update = { state: "confirmed" }

    await orders.findOneAndUpdate(filter, update); //plantear si agregar aca la hora y el "number" o no
}


const getHistory = async (req) => { //quitar ids y datos que no le sirven al usuario
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)

    response = await orders.find({ idUser: decoded.id })
    return response
}

const getAllOrders = () => orders.find()

const changeOrderStatus = async (req) => { 
    const { state } = req.body;
    const idOrder = req.params.idOrder;
    
    const filter = { _id: idOrder };
    const update = { state: state }

    await orders.findOneAndUpdate(filter, update);
}


const getIdUser = (req) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)
    const idUser = decoded.id

    return idUser
}

const getHour = () => {
    const date = new Date()
    return hour =`${date.getHours()}:${date.getMinutes()}`
}


const getDescription = async (req, res) => {
    try {
        const { order } = req.body;
        let description = "";

        for (i = 0; i < order.length; i++) {
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
    modifyOrder,
    getHistory,
    getAllOrders,
    confirmOrder,
    changeOrderStatus
}


