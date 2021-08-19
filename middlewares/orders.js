const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')

const confirmId = (req, res, next) => {
    const user = (users.find(users => users.id == req.params.id))
    if (user){
      	if(user.loggedIn == true) next()
         else res.send("you can't access, log in before");
    }else res.send("ID does not exist");
}

const confirmOrder = (req, res, next) => {  //hacer validacion del nombre del producto

    if(req.body.order === "" || req.body.methodOfPayment === "" || req.body.shippingAddress === "") res.json({msj: "Fill in all fields"})

    const sas = (products.filter(products => products.id == req.body.order.product))
    console.log(sas)
    next()
}

module.exports = {
    confirmId,    
    confirmOrder                                                                                        
};
