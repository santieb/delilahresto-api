const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')


let count = 0;
router.post('/orders/:id', middlewares.confirmId, middlewares.validateOrder, (req, res) => { //filter para ver si tiene un pedido pendiente anteriormente o no
//falta validar todo casi
    count++
    date = new Date()
    const user = (users.find(users => users.id == req.params.id))

    const {order, methodOfPayment, shippingAddress} = req.body;
    const newOrder = {
        idUser: user.id,
        state: orders.states[1],
        number: `#${count}`,
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


module.exports = router;