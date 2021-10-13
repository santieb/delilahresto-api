const products = require('../models/products.models')

const validateProductName = async (req, res, next) => { //validar tambien que no se ingresen datos vacios
    try {
        nameExist = await products.exists({ name: req.body.name });
        nameExist ? res.status(404).json("The name already exists") : next()
    } catch{
        res.status(404).json("not found");
    }
};

const validateProductID = async (req, res, next) => { 
    try {
        validateId = await products.exists({ _id: req.params.idProduct });
        validateId ? next() : res.status(404).send("thes id payment does not exist")
    } catch{
        res.status(404).json("not found");
    }
};


module.exports = {
    validateProductName,
    validateProductID
}