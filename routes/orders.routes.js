const express = require('express');
const router = express.Router();
const controllers = require('../controllers/orders.controllers')
const controllersUser = require('../controllers/users.controllers')


router.post('/orders', (req, res) => { 

    controllers.createOrder(req, res)
})


router.put('/orders/edit', (req, res) => {

    res.json({msj:`edited order`})
})


router.put('/orders/confirmation', (req, res) => {

    res.json({msj:`order confirmed`})
})


router.get('/orders/history', (req, res) => { 

    res.json({msj: orderUser})  
})


router.get('/allOrders', (req, res) => { 

    res.json(orders)  
})


router.put('/allOrders/:idOrder', (req, res) => { 

    res.json({msj: "order edited"})  
})

module.exports = router;
