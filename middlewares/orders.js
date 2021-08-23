const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')
const states = require('../models/states')
const payments = require('../models/payments')

const confirmId = (req, res, next) => {

    const user = (users.find(users => users.id == req.params.id))
    if (user){
      	if(user.loggedIn == true) next()
         else res.send("you can't access, log in before");
    }else res.send("ID does not exist");
}


const validateOrder = (req, res, next) => {  //hacer validacion del nombre del producto y lo del precio //modificar
    
    if(req.body.order === "" || req.body.methodOfPayment === "" || req.body.shippingAddress === "") res.json({msj: "Fill in all fields"}) 

    for(i=0;i<req.body.order.length;i++){   

        if(req.body.order[i].product === "" || req.body.order[i].amount === "") {
        res.status(404).json ({msj: "Fill in all fields"})
        return;
        }

        const findProduct = (products.find(products => products.name == req.body.order[i].product))
        if(findProduct == null){
        res.status(404).json ({msj: "one of the products does not exist"}) 
        return;
        }
    }

    const findOrder = (orders.find(orders => orders.state == "new" && orders.idUser == req.params.id))
    if (findOrder) res.json ({msj: "You already have a pending order, confirm it or modify it to create another"})

    else next()
}


const validateEdit = (req, res, next) => {  
    
    if(req.body.order === "" || req.body.methodOfPayment === "" || req.body.shippingAddress === "") res.json({msj: "Fill in all fields"}) 

    for(i=0;i<req.body.order.length;i++){   

        if(req.body.order[i].product === "" || req.body.order[i].amount === "") {
        res.status(404).json ({msj: "Fill in all fields"})
        return;
        }

        const findProduct = (products.find(products => products.name == req.body.order[i].product))
        if(findProduct == null){
        res.status(404).json ({msj: "one of the products does not exist"}) 
        return;
        }
    }
    
    const user = (orders.find(orders => orders.state == states[1] && orders.idUser == req.params.id))

    if(user) next()
    else res.json({msj: "you don't have any new order to modify"})
}


const confirmOrder = (req, res, next) => { 

    const findOrder = (orders.find(orders => orders.state == "new" && orders.idUser == req.params.id))
    
    if (findOrder)  next()
    else res.json ({msj: "you do not have any new order to be confirmed"})
}


const confirmHistory = (req, res, next) => { 

    const orderUser = (orders.filter(orders => orders.idUser == req.params.id))

    if (orderUser.length == 0) res.json({msj:`you have no history`})
    else next()
}


const confirmIdOrder = (req, res, next) => { 

    const orderID = (orders.find(orders => orders.idOrder == req.params.idOrder))

    if(orderID) next()
    else res.json({msj: "the product ID does not exist"})

}


const validateState = (req, res, next) => { 

    const state = (states.find(states => states == req.body.newState))

    if(state) next()
    else res.json({msj: "the state does not exist"})

}


const validateMethod = (req, res, next) => { 
     
    const method = (payments.find(payments => payments.method == req.body.methodOfPayment))

    if(method) next()
    else res.json({msj: "the payment method is not available"})

}


const calculatingPrice = (req) => { 

    let price = 0
    for(i=0;i<req.body.order.length;i++){ 
        const findProduct = (products.find(products => products.name == req.body.order[i].product))

        let productPrice = findProduct.price
        let amount = req.body.order[i].amount
        price = price + amount * productPrice
    }
    return(price)
}

module.exports = {
    confirmId,    
    validateOrder,
    confirmOrder,
    confirmHistory,
    confirmIdOrder,
    validateState,
    validateMethod,
    validateEdit,
    calculatingPrice                                                                       
};
