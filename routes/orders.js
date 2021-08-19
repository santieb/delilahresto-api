const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')

router.get('/orders/history/:id', middlewares.confirmId, (req, res) => {
    const user = (users.find(users => users.id == req.params.id))
    const order = (orders.ordersList.filter(orders => user.username == orders.username))

    if (order.length == 0) res.json({msj:`you have no history`})
    else res.json(order)  //hacer para que no aparezcan algunos datos
})

let count = 0;
router.post('/orders/:id', middlewares.confirmId, middlewares.confirmOrder, (req, res) => { //filter para ver si tiene un pedido pendiente anteriormente o no
    const user = (users.find(users => users.id == req.params.id))
    count++
    date = new Date()
    
    req.body.state = orders.states[1]
    req.body.time = `${date.getHours()}:${date.getMinutes()}`
    req.body.number = `#${count}`
    req.body.username = user.username
    orders.ordersList.push(req.body)
    res.json({msj:`order created`})
})

router.post('/orders/confirmation/:id ',middlewares.confirmId, (req, res) => {
        
    if (req.body.confirm) 
    res.json({msj:`order created`})
})

module.exports = router;