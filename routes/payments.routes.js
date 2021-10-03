const express = require('express');
const router = express.Router();
const isAdmin = require('../controllers/products')
const controllers = require('../controllers/payments.controller')

router.get('/payments/:id', (req, res) => {

    controllers.listPayments()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/payments/:id', controllers.validateMethod, (req, res) => { 

    controllers.createPayment(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))   
})


router.put('/payments/:id/:idPayment', controllers.validatePayment, controllers.validateMethod,  (req, res) => {
        
    controllers.modifyPayment(req)
    .then(() => res.json("editado"))
    .catch((err) => res.json(err))
})


router.delete('/payments/:id/:idPayment', controllers.validatePayment, (req, res) => {

    controllers.deletePayment(req)
        .then(() => res.json(`payments removed`))
        .catch((err) => res.json(err));
})

module.exports = router;