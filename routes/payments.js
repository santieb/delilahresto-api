const express = require('express');
const router = express.Router();
const users = require('../models/users')
let methodsOfPayments = require('../models/payments')
const middlewares = require('../middlewares/products')


router.get('/payment/:id', (req, res) => {
    
    res.json(products)
})



router.post('/payment/:id', middlewares.confirmId, middlewares.validateProduct, (req, res) => { 


    res.json({msj:`product created`})
})


router.put('/payment', middlewares.confirmId, middlewares.validateProduct, (req, res) => {
        

    res.json({msj:`product edited`})
})


router.delete('/payment', middlewares.confirmId, (req, res) => {


    
    res.json({msj:`removed product`})
})


module.exports = router;