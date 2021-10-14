const express = require('express');
const router = express.Router();
const controllers = require('../controllers/payments.controllers')
const middlewares = require('../middlewares/payments.middlewares')
const middlewaresUser = require('../middlewares/users.middlewares')

router.get('/payments', middlewaresUser.isAuthenticated, (req, res) => {

    controllers.listPayments()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/payments', middlewaresUser.isAdmin, middlewares.validateMethod, (req, res) => { 

    controllers.createPayment(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))   
})


router.put('/payments/:idPayment', middlewaresUser.isAdmin, middlewares.validatePaymentID, middlewares.validateMethod, (req, res) => {
        
    controllers.modifyPayment(req)
    .then(() => res.json("editado"))
    .catch((err) => res.json(err))
})


router.delete('/payments/:idPayment', middlewaresUser.isAdmin, middlewares.validatePaymentID, (req, res) => {

    controllers.deletePayment(req)
        .then(() => res.json(`payments removed`))
        .catch((err) => res.json(err));
})

module.exports = router;