const payments = require('../models/payments.model')

const paymentMethodExist = async (paymentMethod) => await payments.exists({ method: paymentMethod });

const validateMethod = (req, res, next) => { //validar tambien que no se ingresen datos vacios
    paymentMethodExist(req.body.method)
    .then((result) =>
    result ? res.status(404).send("The payment method already exists") : next())
    .catch(() => res.status(404).json("The payment method already exists"));

};


const paymentExist = async (idPayment) => await payments.exists({ _id: idPayment });

const validatePayment = (req, res, next) => { 

    paymentExist(req.params.idPayment)
    .then((result) =>
    result ? next() : res.status(404).send("the id payment does not exist"))
    .catch(() => res.status(404).json("the id product does not exist"));

}

module.exports = {
    validateMethod,
    validatePayment
};
