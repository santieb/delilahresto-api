const methodOfPayments = require('../models/payments')

const validateMethod = (req, res, next) => {

    const method = (methodOfPayments.find(methodOfPayments => methodOfPayments.method == req.body.method))

    if(method) res.json({msj: "The method already exists"})
    else if(req.body.method === ""){
        res.json({msj: "Fill the field"})
    }
    else next()
}

const validateMethodID = (req, res, next) => {

    const checkID = (methodOfPayments.find(methodOfPayments => methodOfPayments.id == req.params.idMethod))
    if (checkID) next()
    else res.send("the method ID does not exist");
}


module.exports = {
    validateMethod,
    validateMethodID
};
