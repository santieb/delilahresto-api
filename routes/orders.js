const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')


let count = 0;
router.post('/orders/:id', middlewares.confirmId, middlewares.confirmOrder, (req, res) => { //filter para ver si tiene un pedido pendiente anteriormente o no
    const user = (users.find(users => users.id == req.params.id))
    count++
    date = new Date()

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

router.get('/orders/history/:id', middlewares.confirmId, (req, res) => {    //hacer para que no aparezcan algunos datos
    const orderUser = (orders.ordersList.filter(orders => orders.idUser == req.params.id))

    if (orderUser.length == 0) res.json({msj:`you have no history`})
    else res.json(orderUser)  
})

router.post('/orders/confirmation/:id ',middlewares.confirmId, (req, res) => {
        
    if (req.body.confirm) 
    res.json({msj:`order created`})
})

module.exports = router;