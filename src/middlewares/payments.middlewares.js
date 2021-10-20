const payments = require('../models/payments.models')

const validateMethod = async (req, res, next) => { //validar tambien que no se ingresen datos vacios
    try {
        const { method } = req.body
        if (!method) return res.status(404).json({ msj: "fill in all the fields" })

        methodExist = await payments.exists({ method: method });
        methodExist ? res.status(404).json("The payment method already exists") : next()
    } catch {
        res.status(404).json("not found");
    }
};

const validatePaymentID = async (req, res, next) => {
    try {
        validateId = await payments.exists({ _id: req.params.idPayment });
        validateId ? next() : res.status(404).send("thes id payment does not exist")
    } catch {
        res.status(404).json("not found");
    }
};

const validateChanges = async (req, res, next) => {
    try {
        const { method } = req.body
        if (!method) return res.status(404).json({ msj: "fill in all the fields" })

        const product = await payments.findOne({ _id: req.params.idPayment });

        if (product.method == method) return res.status(404).json('you have not made any changes')

        methodExist = await payments.exists({ method: method });
        methodExist ? res.status(404).json("The payment method already exists") : next()
    } catch {
        res.status(404).json("not found");
    }
};

module.exports = {
    validateMethod,
    validatePaymentID,
    validateChanges
}