require('dotenv').config()
const products = require('../models/products.models')

const redis = require('redis')
const client = redis.createClient({
  host: process.env.ELASTICACHE_URL,
  port: 6379
})

const listProducts = async () => {
  const response = await products.find()
  client.set('products', JSON.stringify(response), 'EX', 60 * 60 * 24 * 30)
  return response
}

const createProduct = async (req) => {
  const { name, price, abbreviation, description, imgURL } = req.body

  const newProduct = {
    name: name,
    price: price,
    abbreviation: abbreviation,
    description: description,
    imgURL: imgURL
  }
  client.del('products')

  const product = new products(newProduct)
  const response = await product.save()
  return response
}

const modifyProduct = async (req) => {
  const { name, price, abbreviation, description, imgURL } = req.body
  const { idProduct } = req.params

  const filter = { _id: idProduct }
  const update = {
    name: name,
    price: price,
    abbreviation: abbreviation,
    description: description,
    imgURL: imgURL
  }
  client.del('products')

  await products.findOneAndUpdate(filter, update)
}

const deleteProduct = async (req) => {
  client.del('products')
  await products.findByIdAndDelete(req.params.idProduct)
}

module.exports = {
  listProducts,
  createProduct,
  modifyProduct,
  deleteProduct
}
