const express = require('express');
const router = express.Router();
const controllers = require('../controllers/payments.controllers')
const controllersUser = require('../controllers/users.controllers')

router.get('/payments', controllersUser.confirmUser, (req, res) => {

    controllers.listPayments()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/payments', controllersUser.isAdmin, controllers.validateMethod, (req, res) => { 

    controllers.createPayment(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))   
})


router.put('/payments/:idPayment', controllersUser.isAdmin, controllers.validatePaymentID, controllers.validateMethod, (req, res) => {
        
    controllers.modifyPayment(req)
    .then(() => res.json("editado"))
    .catch((err) => res.json(err))
})


router.delete('/payments/:idPayment', controllersUser.isAdmin, controllers.validatePaymentID, (req, res) => {

    controllers.deletePayment(req)
        .then(() => res.json(`payments removed`))
        .catch((err) => res.json(err));
})

module.exports = router;