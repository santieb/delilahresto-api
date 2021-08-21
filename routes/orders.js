const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const isAdmin = require('../middlewares/products')


let id = -1;
router.post('/orders/:id', middlewares.confirmId, middlewares.validateOrder, (req, res) => { 
//falta validar todo casi
    id++
    date = new Date()
    const user = (users.find(users => users.id == req.params.id))

    const {order, methodOfPayment, shippingAddress} = req.body;
    const newOrder = {
        idUser: user.id,
        idOrder: id,
        state: orders.states[1],
        time: `${date.getHours()}:${date.getMinutes()}`,
        order: order,
        methodOfPayment: methodOfPayment,
        shippingAddress: shippingAddress,
    };

    orders.ordersList.push(newOrder)
    res.json({msj:`order created`})
})


router.put('/orders/edit/:id', middlewares.confirmId, (req, res) => {   

    res.json({msj:`edited order`})
})


router.get('/orders/confirmation/:id', middlewares.confirmId, middlewares.confirmOrder, (req, res) => {

    const indexOrder = (orders.ordersList.findIndex(orders => orders.state == "new" && orders.idUser == req.params.id))
    orders.ordersList[indexOrder].state = orders.states[2] 

    res.json({msj:`order confirmed`})
})


router.get('/orders/history/:id', middlewares.confirmId, (req, res) => {    //hacer para que no aparezcan algunos datos

    const orderUser = (orders.ordersList.filter(orders => orders.idUser == req.params.id))
    res.json({msj: orderUser})  
})


router.get('/allOrders/:id', isAdmin.confirmId, (req, res) => { 

    res.json(orders.ordersList)  
})


router.put('/allOrders/:id/:idOrder', isAdmin.confirmId, middlewares.confirmIdOrder, middlewares.validateState, (req, res) => { 

    const indexOrder = (orders.ordersList.findIndex(orders => orders.idOrder == req.params.idOrder))

    orders.ordersList[indexOrder].state = req.body.newState
    res.json({msj: "order edited"})  
})

module.exports = router;