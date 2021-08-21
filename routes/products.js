const express = require('express');
const router = express.Router();
const users = require('../models/users')
let products = require('../models/products')
const middlewares = require('../middlewares/products')

router.get('/products/', (req, res) => {
    
    res.json(products)
})

id = products[products.length-1].id
router.post('/products/:id', middlewares.confirmId, middlewares.validateProduct, (req, res) => { 
    
    id++
    const {name, price} = req.body
    const newProduct = {
        id: id,
        name: name,
        price: price,
    };

    products.push(newProduct)
    res.json({msj:`product created`})
})


router.put('/products/:id/:idProduct', middlewares.confirmId, middlewares.validateProductID, middlewares.validateProduct, (req, res) => {
        
    const indexProduct = products.findIndex(products => req.params.idProduct == products.id)
    const {name, price} = req.body
    const changeProduct = {
        id: req.params.idProduct,
        name: name,
        price: price,
    };

    products[indexProduct] = changeProduct
    res.json({msj:`product edited`})
})


router.delete('/products/:id/:idProduct', middlewares.confirmId, middlewares.validateProductID, (req, res) => {
        
    let removeProduct = products.filter(products => req.params.idProduct != products.id)
    
    products = removeProduct
    res.json({msj:`product removed`})
})


module.exports = router;