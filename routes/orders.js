const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const isAdmin = require('../middlewares/products')
const states = require('../models/states')

let id = -1;
router.post('/orders/:id', middlewares.confirmId, middlewares.validateOrder, middlewares.validateMethod, (req, res) => { 

    id++
    date = new Date()
    const user = (users.find(users => users.id == req.params.id))
                                                                        //validar pedido
    const {order, methodOfPayment, shippingAddress} = req.body;
    const newOrder = {
        idUser: user.id,
        idOrder: id,
        state: states[1],
        time: `${date.getHours()}:${date.getMinutes()}`,
        order: order,
        methodOfPayment: methodOfPayment,
        shippingAddress: shippingAddress,
    };

    orders.push(newOrder)
    res.json({msj:`order created`})
})


router.put('/orders/edit/:id', middlewares.confirmId, (req, res) => {   

    res.json({msj:`edited order`})
})


router.get('/orders/confirmation/:id', middlewares.confirmId, middlewares.confirmOrder, (req, res) => {

    const indexOrder = (orders.findIndex(orders => orders.state == "new" && orders.idUser == req.params.id))
    orders[indexOrder].state = states[2] 

    res.json({msj:`order confirmed`})
})


router.get('/orders/history/:id', middlewares.confirmId, (req, res) => {    //hacer para que no aparezcan algunos datos

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