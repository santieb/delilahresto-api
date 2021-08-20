const express = require('express');
const router = express.Router();
const users = require('../models/users')
const products = require('../models/products')

router.get('/products', (req, res) => {
    
    res.json({msj:`products`})
})


router.post('/products', (req, res) => { 
    
    res.json({msj:`product created`})
})


router.put('/products ', (req, res) => {
        
    res.json({msj:`product edited`})
})


router.delete('/products ', (req, res) => {
        
    res.json({msj:`product created`})
})


module.exports = router;