const payments = require('../models/payments.models')

const listPayments = async () => await payments.find();

const createPayment = async (req) => {  
    const newPayment = { method: req.body.method };
    const payment = new payments(newPayment);
    const response = await payment.save();
    return response;
};

const modifyPayment = async (req) => {
    const filter = { _id: req.params.idPayment };
    const update = { method: req.body.method };
    await payments.findOneAndUpdate(filter,update); 
}

const deletePayment = async (req) => await payments.findByIdAndDelete(req.params.idPayment);


//middlewares
const validateMethod = async (req, res, next) => { //validar tambien que no se ingresen datos vacios
    try {
        methodExist = await payments.exists({ method: req.body.method });
        methodExist ? res.status(404).json("The payment method already exists") : next()
    }catch{
        res.status(404).json("not found");
    }
};

const validatePaymentID = async (req, res, next) => { 
    try {
        validateId = await payments.exists({ _id: req.params.idPayment });
        validateId ? next() : res.status(404).send("thes id payment does not exist")
    }catch{
        res.status(404).json("not found");
    }
};

module.exports = {
    listPayments,
    createPayment,
    modifyPayment,
    deletePayment,
    validateMethod,
    validatePaymentID
};