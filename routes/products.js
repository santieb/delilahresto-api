const express = require('express');
const router = express.Router();
const users = require('../models/users')
let products = require('../models/products')
const middlewares = require('../middlewares/dfs')

router.get('/products/:id', (req, res) => {
    
    res.json(products)
})


router.post('/products/:id', middlewares.confirmId, (req, res) => { 
    
    const {name, price} = req.body
    const newProduct = {
        id: products.length,
        name: name,
        price: price,
    };

    products.push(newProduct)
    res.json({msj:`product created`})
})


router.put('/products/:id/:idProduct', middlewares.confirmId, (req, res) => {
        
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


router.delete('/products/:id/:idProduct', middlewares.confirmId, (req, res) => {
        
    let removeProduct = products.filter(products => req.params.idProduct !== products.id)

    products = removeProduct
    res.json({msj:`removed product`})
})


module.exports = router;