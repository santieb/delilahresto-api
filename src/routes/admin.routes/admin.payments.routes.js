const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/payments.controllers')
const middlewares = require('../../middlewares/payments.middlewares')

router.post('/payments', middlewares.validateMethod, (req, res) => {
    controllers.createPayment(req)
        .then((payment) =>
            res.status(200).json({
                message: 'Product created successfully',
                methodOfpayment: payment,
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to insert data',
                errors: err,
                status: 400
            }))
})

router.put('/payments/:idPayment', middlewares.validatePaymentID, middlewares.validateChanges, (req, res) => {
    controllers.modifyPayment(req)
        .then(() =>
            res.status(200).json({
                message: 'Data update successfully',
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to update data',
                errors: err,
                status: 400
            }))
})

router.delete('/payments/:idPayment', middlewares.validatePaymentID, (req, res) => {
    controllers.deletePayment(req)
        .then(() =>
            res.status(200).json({
                message: 'Data delete successfully',
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to delete data',
                errors: err,
                status: 400
            }))
})


module.exports = router