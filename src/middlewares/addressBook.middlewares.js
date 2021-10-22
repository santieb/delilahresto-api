const jwt = require('jsonwebtoken')
const users = require('../models/users.models')

const validateAddress = async (req, res, next) => {
    try {
        const { address } = req.body
        if (!address) return res.status(404).json({ msg: 'Fill in all the fields', status: 404 })

        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)

        const user = await users.findOne({ _id: decoded.id })

        const addresses = user.addressBook
        const addressExist = (addresses.find(addresses => addresses.shippingAddress == address))
        addressExist ? res.status(404).json({ msg: 'The shippingAddress already exists', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
};

const validateAddressID = async (req, res, next) => {
    try {
        const { idAddress } = req.params;

        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)

        const user = await users.findOne({ _id: decoded.id })

        const addresses = user.addressBook
        const idExist = (addresses.find(addresses => addresses.id == idAddress))
        !idExist ? res.status(404).send({ msg: 'thes id address does not exist', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'thes id address does not exist', status: 404 })
    }
};


module.exports = {
    validateAddress,
    validateAddressID
}