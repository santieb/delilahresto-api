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


const validateOrder = (req, res, next) => {  //hacer validacion del nombre del producto y lo del precio
    
    if(req.body.order === "" || req.body.methodOfPayment === "" || req.body.shippingAddress === "") res.json({msj: "Fill in all fields"})
    
    const findOrder = (orders.ordersList.find(orders => orders.state == "new" && orders.idUser == req.params.id))
    if (findOrder) res.json ({msj: "You already have a pending order, confirm it or modify it to create another"})
    else next()
}


const confirmOrder = (req, res, next) => { 

    const findOrder = (orders.ordersList.find(orders => orders.state == "new" && orders.idUser == req.params.id))
    
    if (findOrder)  next()
    else res.json ({msj: "you do not have any new order to be confirmed"})
}


const confirmHistory = (req, res, next) => { 

    const orderUser = (orders.ordersList.filter(orders => orders.idUser == req.params.id))

    if (orderUser.length == 0) res.json({msj:`you have no history`})
    else next()
}


module.exports = {
    confirmId,    
    validateOrder,
    confirmOrder,
    confirmHistory                                                                                     
};
