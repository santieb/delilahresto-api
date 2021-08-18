const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')

//hacer un endpoint para ver los productos


router.get('/orders/history/:id',middlewares.confirmId, (req, res) => {
    const user = (users.find(users => users.id == req.params.id))
    const order = (orders.ordersList.filter(orders => user.username == orders.username))

    if (order.length == 0) res.json({msj:`you have no history`})
    else res.json(order)  //hacer para que no aparezcan algunos datos
})

let count = 0;
router.post('/orders/:id', middlewares.confirmId, middlewares.confirmOrder, (req, res) => {
    count++
    number =`#${count}`
    date = new Date()
    time = `${date.getHours()}:${date.getMinutes()}`
    const user = (users.find(users => users.id == req.params.id))

    req.body.state = orders.states[1]
    req.body.time = time
    req.body.number = number
    req.body.username = user.username
    orders.ordersList.push(req.body)
    res.json({msj:`order created`})
})

router.post('/orders/confirmation/:id ',middlewares.confirmId, (req, res) => { // arreglar

    if (req.body.confirm) 
    res.json({msj:`order created`})
})

module.exports = router;