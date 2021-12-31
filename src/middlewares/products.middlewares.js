require('dotenv').config()
const products = require('../models/products.models')

const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis)
const client = redis.createClient({
  host: process.env.ELASTICACHE_URL,
  port: 6379
})

const productsCache = async (req, res, next) => {
  const productsOnRedis = await client.getAsync('products')
  productsOnRedis !== null ? res.json(JSON.parse(productsOnRedis)) : next()
}

const validateProduct = async (req, res, next) => {
  try {
    const { name, abbreviation } = req.body
    if (!name || !abbreviation) return res.status(404).json({ msg: 'Fill in all the fields', status: 404 })

    const nameExist = await products.exists({ name: name })
    if (nameExist) return res.status(404).json({ msg: 'The name already exists', status: 404 })

    const abbreviationExist = await products.exists({ abbreviation: abbreviation })
    abbreviationExist ? res.status(404).json({ msg: 'The abbreviation already exists', status: 404 }) : next()
  } catch {
    res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
  }
}

const validateProductID = async (req, res, next) => {
  try {
    validateId = await products.exists({ _id: req.params.idProduct })
    !validateId ? res.status(404).json({ msg: 'Thes id payment does not exist', status: 404 }) : next()
  } catch {
    res.status(404).json({ msg: 'Thes id payment does not exist', status: 404 })
  }
}

const validateChanges = async (req, res, next) => {
  try {
    const { name, price, abbreviation } = req.body

    const product = await products.findOne({ _id: req.params.idProduct })

    if (product.name == name && product.abbreviation != abbreviation) {
      const abbreviationExist = await products.exists({ abbreviation: req.body.abbreviation })
      if (abbreviationExist) return res.status(404).json({ msg: 'The abbreviation already exists', status: 404 })
    } else if (product.name != name && product.abbreviation == abbreviation) {
      const nameExist = await products.exists({ name: req.body.name })
      if (nameExist) res.status(404).json({ msg: 'The name already exists', status: 404 })
    } else if (product.name != name && product.abbreviation != abbreviation) {
      const nameExist = await products.exists({ name: req.body.name })
      if (nameExist) res.status(404).json({ msg: 'The name already exists', status: 404 })
      const abbreviationExist = await products.exists({ abbreviation: req.body.abbreviation })
      if (abbreviationExist) return res.status(404).json({ msg: 'The abbreviation already exists', status: 404 })
    } else if (product.name == name && product.abbreviation == abbreviation && product.price == price) return res.status(404).json({ msg: 'you have not made any changes', status: 404 })

    next()
  } catch {
    res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
  }
}

module.exports = {
  productsCache,
  validateProduct,
  validateProductID,
  validateChanges
}
