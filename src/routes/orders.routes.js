const express = require('express');
const router = express.Router();
const controllers = require('../controllers/orders.controllers')
const middlewares = require('../middlewares/orders.middlewares')
const middlewaresUser = require('../middlewares/users.middlewares')


router.post('/orders', middlewaresUser.isAuthenticated, middlewares.validateRequest, (req, res) => {

    controllers.createOrder(req, res)
        .then(() => res.json({ msj: "Order created" }))
        .catch(err => res.json(err));
})


router.put('/orders', middlewaresUser.isAuthenticated, middlewares.validateChanges, (req, res) => {

    controllers.modifyOrder(req, res)
        .then(() => res.json({ msj: "Order edited" }))
        .catch(err => res.json(err));
})


router.put('/orders/confirmation', middlewaresUser.isAuthenticated, middlewares.validateConfirmation, (req, res) => { 

    controllers.confirmOrder(req)
        .then(() => res.json({ msj: "We receive your order. You can track your order to know where it is" }))
        .catch(err => res.json(err));
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


router.put('/allOrders/:idOrder', middlewaresUser.isAdmin, middlewares.validateState, (req, res) => {

    controllers.changeOrderStatus(req)
        .then(() => res.json({ msj: " Order status changed" }))
        .catch(err => res.json(err));
})
module.exports = router;
