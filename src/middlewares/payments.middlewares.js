const payments = require('../models/payments.models')

const validateMethod = async (req, res, next) => {
    try {
        const { method } = req.body
        if (!method) return res.status(404).json({ msg: 'Fill in all the fields', status: 404 })

        methodExist = await payments.exists({ method: method })
        methodExist ? res.status(404).json({ msg: 'The payment method already exists', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
};

const validatePaymentID = async (req, res, next) => {
    try {
        validateId = await payments.exists({ _id: req.params.idPayment })
        !validateId ? res.status(404).send({ msg: 'Thes id payment does not exist', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Thes id payment does not exist', status: 404 })
    }
};

const validateChanges = async (req, res, next) => {
    try {
        const { method } = req.body
        if (!method) return res.status(404).json({ msj: 'fill in all the fields' })

        const product = await payments.findOne({ _id: req.params.idPayment })

        if (product.method == method) return res.status(404).json({ msg: 'you have not made any changes', status: 404 })

        methodExist = await payments.exists({ method: method });
        methodExist ? res.status(404).json({ msg: 'The payment method already exists', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
}


module.exports = {
    validateMethod,
    validatePaymentID,
    validateChanges
}