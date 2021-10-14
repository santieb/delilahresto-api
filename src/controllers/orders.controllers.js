const jwt = require('jsonwebtoken');
const orders = require('../models/orders.models');
const products = require('../models/products.models')

const createOrder = async (req, res) => {   

    const token = req.headers.authorization.replace('Bearer ','');
    const decoded = jwt.verify(token, process.env.SECRET)

    const { order, methodOfPayment } = req.body

    const price = await calculatePrice(req, res, order)

    const newOrder = {
        idUser: decoded.id,
        order: order,
        price: price,
        methodOfPayment: methodOfPayment,
    };

    const ordera = new orders(newOrder);
    const response = await ordera.save();
    return response;
};

const getHistory = (req) =>{ //quitar ids y datos que no le sirven al usuario

    const token = req.headers.authorization.replace('Bearer ','');
    const decoded = jwt.verify(token, process.env.SECRET)

    response = orders.find( {idUser: decoded.id} )
    return response
}

const getAllOrders = (req) => orders.find()


const calculatePrice = async (req,res, order) => { 
    try{
    let price = 0

    for(i=0;i<req.body.order.length;i++){ 
        const product = await products.findOne({ name: req.body.order[i].product })
        let productPrice = product.price
        let amount = order[i].amount
        price += amount * productPrice

        order[i].productPrice = productPrice;
    }
    return price
    }catch{
        res.send("error")
    }
}


module.exports = {
    createOrder,
    getHistory,
    getAllOrders,
}


