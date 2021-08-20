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

const confirmOrder = (req, res, next) => {  //hacer validacion del nombre del producto y lo del precio

    if(req.body.order === "" || req.body.methodOfPayment === "" || req.body.shippingAddress === "") res.json({msj: "Fill in all fields"})
    
    const orderUser = (orders.ordersList.filter(orders => orders.idUser == req.params.id))
    const validateOrder = (orderUser.find(orderUser => orderUser.state == "new"))

    if (validateOrder) res.send ("You already have a pending order, confirm it or modify it to create another")
    else next()
}

module.exports = {
    confirmId,    
    confirmOrder                                                                                        
};
