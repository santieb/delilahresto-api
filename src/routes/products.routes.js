const express = require('express')
const router = express.Router()
const controllers = require('../controllers/products.controllers')
const middlewares = require('../middlewares/products.middlewares')

router.get('/', middlewares.productsCache, (req, res) => {
  controllers.listProducts()
    .then((products) =>
      res.status(200).json({
        message: 'Data find successfully',
        products: products,
        status: 200
      }))
    .catch((err) =>
      res.status(404).json({
        message: 'Unable to find data',
        errors: err,
        status: 404
      }))
})

module.exports = router
