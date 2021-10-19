const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/payments.controllers')
const middlewares = require('../../middlewares/payments.middlewares')

router.post('/payments', middlewares.validateMethod, (req, res) => {

    controllers.createPayment(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})


router.put('/payments/:idPayment', middlewares.validatePaymentID, middlewares.validateChanges, (req, res) => {

    controllers.modifyPayment(req)
    .then(() => res.json("edited"))
    .catch((err) => res.json(err))
})


router.delete('/payments/:idPayment', middlewares.validatePaymentID, (req, res) => {

    controllers.deletePayment(req)
    .then(() => res.json(`payments removed`))
    .catch((err) => res.json(err));
})

module.exports = router;