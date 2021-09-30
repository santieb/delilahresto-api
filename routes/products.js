const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/products')
const products = require('../models/products.model')

router.get('/products', (req, res) => {
    
    const list = async () => await products.find(); //mover
    list()
    .then(products => res.json(products))
    .catch(err => res.json(err));

})


router.post('/products/:id', middlewares.confirmId, middlewares.validateProductName, (req, res) => { 
        
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    
    const createProduct = async (newProduct) => {   //mover
        const product = new products(newProduct);
        const response = await product.save();
        return response;
};
    createProduct(newProduct)
        .then((response) => res.json(response))
        .catch((err) => res.json(err))
})
    


router.put('/products/:id/:idProduct', middlewares.confirmId,  middlewares.validateProductID, middlewares.validateProductName, (req, res) => { //validar y modularizar
        
    const filter = { _id: req.params.idProduct };
    const update = { name: req.body.name };

    const modifyProduct = async () => await products.findOneAndUpdate(filter,update); //mover

    modifyProduct().then(() => res.json("editado"))
    .catch((err) => res.json(err))

})


router.delete('/products/:id/:idProduct', middlewares.confirmId, middlewares.validateProductID,  (req, res) => { //validar y modularizar
        
    const deleteProduct = async (idProduct) => await products.findByIdAndDelete(idProduct); //mover

    deleteProduct(req.params.idProduct)
        .then(() => res.json(`product removed`))
        .catch(() => res.json("error"));

})


module.exports = router;