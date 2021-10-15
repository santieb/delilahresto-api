const products = require('../models/products.models')

const validateProduct = async (req, res, next) => { //validar tambien que no se ingresen datos vacios
    try {
        const nameExist = await products.exists({ name: req.body.name });
        if (nameExist) res.status(404).json("The name already exists")

        const abbreviationExist = await products.exists({ abbreviation: req.body.abbreviation });
        if (abbreviationExist) return res.status(404).json("The abbreviation already exists")
        next()
    } catch {
        res.status(404).json("not found");
    }
};

const validateProductID = async (req, res, next) => {
    try {
        validateId = await products.exists({ _id: req.params.idProduct });
        validateId ? next() : res.status(404).send("thes id payment does not exist")
    } catch {
        res.status(404).json("not found");
    }
};

const validateChanges = async (req, res, next) => {
    try {
        const { name, price, abbreviation } = req.body

        const product = await products.findOne({ _id: req.params.idProduct });
        
        if(product.name == name && product.abbreviation != abbreviation) {
            const abbreviationExist = await products.exists({ abbreviation: req.body.abbreviation });
            if (abbreviationExist) return res.status(404).json("The abbreviation already exists")
        }

        if(product.name != name && product.abbreviation == abbreviation) {
            const nameExist = await products.exists({ name: req.body.name });
            if (nameExist) res.status(404).json("The name already exists")
        }

        if(product.name != name && product.abbreviation != abbreviation) {
            const nameExist = await products.exists({ name: req.body.name });
            if (nameExist) res.status(404).json("The name already exists")
            const abbreviationExist = await products.exists({ abbreviation: req.body.abbreviation });
            if (abbreviationExist) return res.status(404).json("The abbreviation already exists")
        }

        if(product.name == name && product.abbreviation == abbreviation && product.price == price) return res.status(404).json('you have not made any changes')

        next()
    } catch {
        res.status(404).json("not found");
    }
};

module.exports = {
    validateProduct,
    validateProductID,
    validateChanges
}