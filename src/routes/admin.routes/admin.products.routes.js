const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/products.controllers')
const middlewares = require('../../middlewares/products.middlewares')

router.post('/products', middlewares.validateProduct, (req, res) => {

    controllers.createProduct(req)
        .then((response) => res.json(response))
        .catch((err) => res.json(err))
})


router.put('/products/:idProduct', middlewares.validateProductID, middlewares.validateChanges, (req, res) => {

    controllers.modifyProduct(req)
        .then(() => res.json("editado"))
        .catch((err) => res.json(err))
})


router.delete('/products/:idProduct', middlewares.validateProductID, (req, res) => {

    controllers.deleteProduct(req)
        .then(() => res.json(`product removed`))
        .catch((err) => res.json(err));
})

module.exports = router;