const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/products.controllers')
const middlewares = require('../../middlewares/products.middlewares')

router.post('/products', middlewares.validateProduct, (req, res) => {
    controllers.createProduct(req)
        .then((product) =>
            res.status(200).json({
                message: 'Product created successfully',
                product: product,
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to update data',
                errors: err,
                status: 400
            }))
})

router.put('/products/:idProduct', middlewares.validateProductID, middlewares.validateChanges, (req, res) => {
    controllers.modifyProduct(req)
        .then(() =>
            res.status(200).json({
                message: 'Data update successfully',
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to update data',
                errors: err,
                status: 400
            }))
})

router.delete('/products/:idProduct', middlewares.validateProductID, (req, res) => {
    controllers.deleteProduct(req)
        .then(() =>
            res.status(200).json({
                message: 'Data delete successfully',
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to delete data',
                errors: err,
                status: 400
            }))
})


module.exports = router