const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/orders.controllers')
const middlewares = require('../../middlewares/orders.middlewares')


router.get('/allOrders', (req, res) => {

    controllers.getAllOrders()
        .then((response) => res.json(response))
        .catch(err => res.json(err));
})


router.put('/allOrders/:idOrder', middlewares.validateState, (req, res) => {

    controllers.changeOrderStatus(req)
        .then(() => res.json({ msj: " Order status changed" }))
        .catch(err => res.json(err));
})

module.exports = router;
