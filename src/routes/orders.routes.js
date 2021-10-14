const express = require('express');
const router = express.Router();
const controllers = require('../controllers/orders.controllers')
const middlewares = require('../middlewares/orders.middlewares')
const middlewaresUser = require('../middlewares/users.middlewares')


router.post('/orders', middlewaresUser.isAuthenticated, middlewares.validateRequest, (req, res) => { 

    controllers.createOrder(req, res)
    .then(() => res.json({msj: "Order created"}))
    .catch(err => res.json(err));
})


router.put('/orders/edit', middlewaresUser.isAuthenticated, (req, res) => {

    res.json({msj:`edited order`})
})


router.put('/orders/confirmation', middlewaresUser.isAuthenticated, (req, res) => {

    res.json({msj:`order confirmed`})
})


router.get('/orders/history', middlewaresUser.isAuthenticated, (req, res) => { 

    controllers.getHistory(req)
    .then((response) => res.json(response))
    .catch(err => res.json(err));
})


router.get('/allOrders', middlewaresUser.isAdmin, (req, res) => { 

    controllers.getAllOrders()
    .then((response) => res.json(response))
    .catch(err => res.json(err));
})


router.put('/allOrders/:idOrder', middlewaresUser.isAdmin, (req, res) => { 

    res.json({msj: "order edited"})  
})

module.exports = router;
