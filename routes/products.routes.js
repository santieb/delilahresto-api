const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products.controllers')
const controllersUser = require('../controllers/users.controllers')

router.get('/products', (req, res) => {
    
    controllers.listProducts()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/products/:idUser', controllersUser.confirmUser, controllersUser.confirmIsAdmin, controllers.validateProductName, (req, res) => { 
        
    controllers.createProduct(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))   
})
    

router.put('/products/:idUser/:idProduct', controllersUser.confirmUser, controllersUser.confirmIsAdmin, controllers.validateProductID, controllers.validateProductName, (req, res) => { 
           
    controllers.modifyProduct(req)
    .then(() => res.json("editado"))
    .catch((err) => res.json(err))
})


router.delete('/products/:idUser/:idProduct', controllersUser.confirmUser, controllersUser.confirmIsAdmin, controllers.validateProductID,  (req, res) => { 
        
    controllers.deleteProduct(req)
        .then(() => res.json(`product removed`))
        .catch((err) => res.json(err));
})

module.exports = router;