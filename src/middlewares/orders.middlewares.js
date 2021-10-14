const products = require('../models/products.models')
const payments = require('../models/payments.models')

const validateRequest = async (req, res, next) => { 
    try{
        const { order, methodOfPayment } = req.body;
        for(let i=0;i<order.length;i++){
            productExist = await products.exists({ name: order[i].product})
            if(!productExist) return res.status(404).send("a product entered does not exist. Check the product list")
        }

        paymentExist = await payments.exists({ method: methodOfPayment })
        if(!paymentExist) return res.status(404).send("the payment method does not exist")

        next()
    }catch(err){
        res.status(404).send("an unexpected error has occurred")
    }
}

module.exports = {
    validateRequest,
}
