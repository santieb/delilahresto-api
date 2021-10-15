const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products.controllers')
const middlewares = require('../middlewares/products.middlewares')
const middlewaresUser = require('../middlewares/users.middlewares')

router.get('/products', middlewaresUser.isAuthenticated, (req, res) => {

    controllers.listProducts()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/products', middlewaresUser.isAdmin, middlewares.validateProduct, (req, res) => {

    controllers.createProduct(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})


router.put('/products/:idProduct', middlewaresUser.isAdmin, middlewares.validateProductID, middlewares.validateChanges, (req, res) => {

    controllers.modifyProduct(req)
    .then(() => res.json("editado"))
    .catch((err) => res.json(err))
})


router.delete('/products/:idProduct', middlewaresUser.isAdmin, middlewares.validateProductID, (req, res) => {

    controllers.deleteProduct(req)
    .then(() => res.json(`product removed`))
    .catch((err) => res.json(err));
})

module.exports = router;