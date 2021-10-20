const express = require('express');
const router = express.Router();
const controllers = require('../controllers/addressBook.controllers')
const middlewares = require('../middlewares/addressBook.middlewares')

router.get('/addressBook', (req, res) => {

    controllers.listShippingAddresses(req)
        .then(addressBook => res.json(addressBook))
        .catch(err => res.json(err));
})

router.post('/addressBook', (req, res) => {

    controllers.createAddress(req)
        .then(() => res.json("address added successfully"))
        .catch((err) => res.json(err))
})


router.put('/addressBook/:idAddress', (req, res) => {

})


router.delete('/addressBook/:idAddress', (req, res) => {

    controllers.deleteAddress(req)
        .then(() => res.json("address deleted successfully"))
        .catch((err) => res.json(err))
})

module.exports = router;