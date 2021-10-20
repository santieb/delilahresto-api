const express = require('express');
const router = express.Router();
const controllers = require('../controllers/orders.controllers')
const middlewares = require('../middlewares/orders.middlewares')


router.post('/orders', middlewares.validateRequest, (req, res) => {

    controllers.createOrder(req, res)
        .then(() => res.json({ msj: "Order created" }))
        .catch(err => res.json(err));
})


router.put('/orders', middlewares.validateChanges, (req, res) => {

    controllers.modifyOrder(req, res)
        .then(() => res.json({ msj: "Order edited" }))
        .catch(err => res.json(err));
})


router.put('/orders/confirmation', middlewares.validateConfirmation, (req, res) => {

    controllers.confirmOrder(req)
        .then(() => res.json({ msj: "We receive your order." }))
        .catch(err => res.json(err));
})


router.get('/orders/history', (req, res) => {

    controllers.getHistory(req)
        .then((response) => res.json(response))
        .catch(err => res.json(err));
})


module.exports = router;
