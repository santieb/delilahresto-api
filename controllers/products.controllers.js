const products = require('../models/products.models')

const listProducts = async () => await products.find();

const createProduct = async (req) => {  
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    const product = new products(newProduct);
    const response = await product.save();
    return response;
};

const modifyProduct = async (req) => {
    const filter = { _id: req.params.idProduct };
    const update = {
        name: req.body.name,
        price: req.body.price
    };
    await products.findOneAndUpdate(filter, update); 
}

const deleteProduct = async (req) => await products.findByIdAndDelete(req.params.idProduct);


//middlewares
const validateProductName = async (req, res, next) => { //validar tambien que no se ingresen datos vacios
    try {
        nameExist = await products.exists({ name: req.body.name });
        nameExist ? res.status(404).json("The name already exists") : next()
    }catch{
        res.status(404).json("not found");
    }
};

const validateProductID = async (req, res, next) => { 
    try {
        validateId = await products.exists({ _id: req.params.idProduct });
        validateId ? next() : res.status(404).send("thes id payment does not exist")
    }catch{
        res.status(404).json("not found");
    }
};

module.exports = {
    listProducts,
    createProduct,
    modifyProduct,
    deleteProduct,
    validateProductName,
    validateProductID,
} 