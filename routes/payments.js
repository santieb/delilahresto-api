const express = require('express');
const router = express.Router();
const payments = require('../models/payments.model')
const isAdmin = require('../middlewares/products')
const middlewares = require('../middlewares/payments')


router.get('/payments/:id', isAdmin.confirmId, (req, res) => {

    const list = async () => await payments.find(); //mover
    list()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/payments/:id', isAdmin.confirmId, middlewares.validateMethod, (req, res) => { 

    const newPayment = {
        method: req.body.method,
    };
    
    const createPayment = async (newPayment) => {   //mover
        const payment = new payments(newPayment);
        const response = await payment.save();
        return response;
};
    createPayment(newPayment)
        .then((response) => res.json(response))
        .catch((err) => res.json(err))      
})


router.put('/payments/:id/:idPayment',  isAdmin.confirmId, middlewares.validatePayment, middlewares.validateMethod,  (req, res) => {
        
    const filter = { _id: req.params.idPayment };
    const update = { method: req.body.method };

    const modifyPayment= async () => await payments.findOneAndUpdate(filter,update); //mover

    modifyPayment().then(() => res.json("editado"))
    .catch((err) => res.json(err))
})


router.delete('/payments/:id/:idPayment', isAdmin.confirmId, middlewares.validatePayment, (req, res) => {

    const deletePayment = async (idPayment) => await payments.findByIdAndDelete(idPayment); //mover

    deletePayment(req.params.idPayment)
        .then(() => res.json(` payments removed`))
        .catch(() => res.json("error"));
})


module.exports = router;