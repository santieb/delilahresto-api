const users = require('../models/users')
const products = require('../models/products')

const confirmId = (req, res, next) => {

    const user = (users.find(users => users.id == req.params.id))
    if (user){
      	if (user.loggedIn == false) res.send("you can't access, log in before");

        else if (user.isAdmin == false) res.send("you can't access")

        else next()
    }else res.send("ID does not exist");
}

const validateProduct = (req, res, next) => {

    const checkProduct = (products.find(products => products.name == req.body.name))

    if(checkProduct) res.json({msj: "The name already exists"})
    else if(req.body.name === "" || req.body.price === ""){
        res.json({msj: "Fill in all fields"})
    }
    else next()
}

const validateProductID = (req, res, next) => {

    const checkID = (products.find(products => products.id == req.params.idProduct))
    if (checkID) next()
    else res.send("the product ID does not exist");
}

module.exports = {
    confirmId,
    validateProduct,
    validateProductID
} 