const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')
const isAdmin = require('../middlewares/products')
const states = require('../models/states');


let id = -1;
router.post('/orders/:id',  (req, res) => { 
    console.log(req.body.order[0].product)
    console.log(req.body.order)
    id++
    date = new Date()
    const user = (users.find(users => users.id == req.params.id)) 

    price = middlewares.calculatingPrice(req)

    const {order, methodOfPayment, shippingAddress} = req.body;
    const newOrder = {
        idUser: user.id,
        idOrder: id,
        state: states[1],
        price: price,
        time: `${date.getHours()}:${date.getMinutes()}`,
        order: order,
        methodOfPayment: methodOfPayment,
        shippingAddress: shippingAddress,
    };

    orders.push(newOrder)
    res.json({msj:`order created`})
})


router.put('/orders/edit/:id', middlewares.confirmId, middlewares.validateEdit, middlewares.validateMethod,  (req, res) => {       //falta validar

    const user = (orders.find(orders => orders.idUser == req.params.id && orders.state == states[1]))
    const indexOrder = orders.findIndex(orders => orders.state == states[1])

    const {order, methodOfPayment, shippingAddress} = req.body;
    const changeOrder = {
        idUser: req.params.id,
        idOrder: user.idOrder,
        state: states[1],
        time: `${date.getHours()}:${date.getMinutes()}`,
        order: order,
        methodOfPayment: methodOfPayment,
        shippingAddress: shippingAddress,
    };

    orders[indexOrder] = changeOrder

    res.json({msj:`edited order`})
})


router.get('/orders/confirmation/:id', middlewares.confirmId, middlewares.confirmOrder, (req, res) => {

    const indexOrder = (orders.findIndex(orders => orders.state == "new" && orders.idUser == req.params.id))
    orders[indexOrder].state = states[2] 

    res.json({msj:`order confirmed`})
})


router.get('/orders/history/:id', middlewares.confirmId, (req, res) => {

    const orderUser = (orders.filter(orders => orders.idUser == req.params.id))
    res.json({msj: orderUser})  
})


router.get('/allOrders/:id', isAdmin.confirmId, (req, res) => { 

    res.json(orders)  
})


router.put('/allOrders/:id/:idOrder', isAdmin.confirmId, middlewares.confirmIdOrder, middlewares.validateState, (req, res) => { 

    const indexOrder = (orders.findIndex(orders => orders.idOrder == req.params.idOrder))

    orders[indexOrder].state = req.body.newState
    res.json({msj: "order edited"})  
})

module.exports = router;