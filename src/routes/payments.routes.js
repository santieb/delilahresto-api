const express = require('express');
const router = express.Router();
const controllers = require('../controllers/payments.controllers')

router.get('/payments', (req, res) => {
    controllers.listPayments()
        .then((paymentMethods) =>
            res.status(200).json({
                message: 'Data find successfully',
                paymentMethods: paymentMethods,
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to find data',
                errors: err,
                status: 404
            }))
})


module.exports = router