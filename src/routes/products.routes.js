const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products.controllers')
const middlewares = require('../middlewares/products.middlewares')

router.get('/products', middlewares.productsCache, (req, res) => {

    controllers.listProducts()
        .then(payments => res.json(payments))
        .catch(err => res.json(err));
})


module.exports = router;