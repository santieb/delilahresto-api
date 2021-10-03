const users = require('../models/users')
const products = require('../models/products.models')


const confirmId = (req, res, next) => {

    const user = (users.find(users => users.id == req.params.id))
    if (user){
      	if (user.loggedIn == false) res.send("you can't access, log in before");

        else if (user.isAdmin == false) res.send("you can't access")

        else next()
    }else res.send("ID does not exist");
}


const nameExist = async (nameProduct) => await products.exists({ name: nameProduct });

const validateProductName = (req, res, next) => { //validar tambien que no se ingresen datos vacios
    nameExist(req.body.name)
    .then((result) =>
    result ? res.status(404).send("The name already exists") : next())
    .catch(() => res.status(404).json("The name already exists"));

};


const productExist = async (idProduct) => await products.exists({ _id: idProduct });

const validateProductID = (req, res, next) => { 

    productExist(req.params.idProduct)
    .then((result) =>
    result ? next() : res.status(404).send("the product ID does not exist"))
    .catch(() => res.status(404).json("the product ID does not exist"));

}

//validar que no puedan ingresar datos vacios


module.exports = {
    confirmId,
    validateProductName,
    validateProductID,
} 