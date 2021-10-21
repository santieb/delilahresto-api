const express = require('express');
const router = express.Router();
const controllers = require('../controllers/addressBook.controllers')
const middlewares = require('../middlewares/addressBook.middlewares')

router.get('/addressBook', (req, res) => {

    controllers.listShippingAddresses(req)
        .then(addressBook => res.json(addressBook))
        .catch(err => res.json(err));
})

router.post('/addressBook', middlewares.validateAddress, (req, res) => {

    controllers.createAddress(req)
        .then(() => res.json("address added successfully"))
        .catch((err) => res.json(err))
})

router.delete('/addressBook/:idAddress', middlewares.validateAddressID, (req, res) => {

    controllers.deleteAddress(req)
        .then(() => res.json("address deleted successfully"))
        .catch((err) => res.json(err))
})

module.exports = router;