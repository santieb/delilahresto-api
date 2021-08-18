const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/orders')
const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')

//hacer un endpoint para ver los productos


router.get('/orders/history/:id',middlewares.confirmId, (req, res) => {
    
    res.json(products)
})

let id = 0;
router.post('/orders/:id', middlewares.confirmId, (req, res) => {
    id++
    date = new Date()
    time = `${date.getHours()}:${date.getMinutes()}` //arreglar pm y am
    const user = (users.find(users => users.id == req.params.id))

    req.body.state = orders.states[1]
    req.body.time = time
    req.body.id = id
    req.body.user = user.username
    orders.push(req.body)
    res.json({msj:`order created`})
})

router.post('/orders/confirmation/:id ',middlewares.confirmId, (req, res) => { // arreglar

    if (req.body.confirm) 
    res.json({msj:`order created`})
})

module.exports = router;