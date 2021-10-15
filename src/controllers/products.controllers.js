const products = require('../models/products.models')

const listProducts = async () => await products.find();

const createProduct = async (req) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        abbreviation: req.body.abbreviation
    };
    const product = new products(newProduct);
    const response = await product.save();
    return response;
};

const modifyProduct = async (req) => {
    const filter = { _id: req.params.idProduct };
    const update = {
        name: req.body.name,
        price: req.body.price,
        abbreviation: req.body.abbreviation
    };
    await products.findOneAndUpdate(filter, update);
}

const deleteProduct = async (req) => await products.findByIdAndDelete(req.params.idProduct);


module.exports = {
    listProducts,
    createProduct,
    modifyProduct,
    deleteProduct,
}