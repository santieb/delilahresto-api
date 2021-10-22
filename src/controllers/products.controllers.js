const products = require('../models/products.models')

const redis = require('redis')
const client = redis.createClient()

const listProducts = async () => {
    const response = await products.find();
    client.set('products', JSON.stringify(response), 'EX', 60 * 60 * 24 * 30)
    return response
}

const createProduct = async (req) => {
    const { name, price, abbreviation} = req.body
    
    const newProduct = {
        name: name,
        price: price,
        abbreviation: abbreviation
    };
    const product = new products(newProduct)
    const response = await product.save()
    return response
};

const modifyProduct = async (req) => {
    const { name, price, abbreviation} = req.body
    const { idProduct } = req.params

    const filter = { _id: idProduct }
    const update = {
        name: name,
        price: price,
        abbreviation: abbreviation
    };
    client.del('products')

    await products.findOneAndUpdate(filter, update)
}

const deleteProduct = async (req) => await products.findByIdAndDelete(req.params.idProduct);


module.exports = {
    listProducts,
    createProduct,
    modifyProduct,
    deleteProduct,
}