const express = require('express');
const router = express.Router();
const controllers = require('../controllers/addressBook.controllers')
const middlewares = require('../middlewares/addressBook.middlewares')

router.get('/addressBook', (req, res) => {
    controllers.listShippingAddresses(req)
        .then((addressBook) =>
            res.status(200).json({
                message: 'Data find successfully',
                addresses: addressBook,
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to find data',
                errors: err,
                status: 404
            }))
})

router.post('/addressBook', middlewares.validateAddress, (req, res) => {
    controllers.createAddress(req)
        .then((address) =>
            res.status(200).json({
                message: 'Address created successfully',
                address: address,
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to update data',
                errors: err,
                status: 400
            }))
})

router.delete('/addressBook/:idAddress', middlewares.validateAddressID, (req, res) => {
    controllers.deleteAddress(req)
        .then(() =>
            res.status(200).json({
                message: 'Data delete Successfully',
                status: 200
            }))
        .catch((err) =>
            res.status(400).json({
                message: 'Unable to delete data',
                errors: err,
                status: 400
            }))
})


module.exports = router