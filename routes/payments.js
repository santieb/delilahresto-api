const express = require('express');
const router = express.Router();
let methodOfPayments = require('../models/payments')
const isAdmin = require('../middlewares/products')
const middlewares = require('../middlewares/payments')


router.get('/payments/:id', isAdmin.confirmId, (req, res) => {

    res.json(methodOfPayments)
})


idMethod = methodOfPayments[methodOfPayments.length-1].id
router.post('/payments/:id', isAdmin.confirmId, middlewares.validateMethod, (req, res) => { 

    idMethod++
    const {method} = req.body
    const newMethod = {
        id: idMethod,
        method: method
    };

    methodOfPayments.push(newMethod)
    res.json({msj:`payment method created`})
})


router.put('/payments/:id/:idMethod',  isAdmin.confirmId, middlewares.validateMethodID, middlewares.validateMethod,  (req, res) => {
        
    const indexMethod = methodOfPayments.findIndex(methodOfPayments => req.params.idMethod == methodOfPayments.id)

    methodOfPayments[indexMethod].method = req.body.method
    res.json({msj:`payment method edited`})
})


router.delete('/payments/:id/:idMethod', middlewares.validateMethodID, isAdmin.confirmId, (req, res) => {

    let indexMethod = methodOfPayments.findIndex(methodOfPayments => req.params.idMethod == methodOfPayments.id)

    methodOfPayments.splice(indexMethod, 1)
    res.json({msj:`payment method removed`})
})


module.exports = router;