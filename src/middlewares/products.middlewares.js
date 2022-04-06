require('dotenv').config()
const products = require('../models/products.models')

const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis)
const client = redis.createClient(process.env.REDIS_URL)


const productsCache = async (req, res, next) => {
  const productsOnRedis = await client.getAsync('products')
  const products = JSON.parse(productsOnRedis)
  productsOnRedis !== null ? 
    res.status(200).json({
    message: 'Data find successfully',
      products: products,
      status: 200
  }) : next()
}

const validateProduct = async (req, res, next) => {
  try {
    const { name, abbreviation, description } = req.body
    if (!name || !abbreviation || !description) return res.status(404).json({ message: 'Fill in all the fields', status: 404 })

    const nameExist = await products.exists({ name: name })
    if (nameExist) return res.status(404).json({ message: 'The name already exists', status: 404 })

    next()
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

const validateProductID = async (req, res, next) => {
  try {
    const validateId = await products.exists({ _id: req.params.idProduct })
    !validateId ? res.status(404).json({ message: 'that id payment does not exist', status: 404 }) : next()
  } catch {
    res.status(404).json({ message: 'that id payment does not exist', status: 404 })
  }
}

const validateChanges = async (req, res, next) => {
  try {
    const { name } = req.body

    const nameExist = await products.exists({ name: name, _id: { $not: { $eq: req.params.idProduct }}})
    if (nameExist) return res.status(404).json({ message: 'The name already exists', status: 404 })

    next()
  } catch {
    res.status(404).json({ message: 'Request denied. Check data', status: 404 })
  }
}

module.exports = {
  productsCache,
  validateProduct,
  validateProductID,
  validateChanges
}
