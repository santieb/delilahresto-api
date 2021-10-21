const jwt = require('jsonwebtoken');
const users = require('../models/users.models')

const validateAddress = async (req, res, next) => {
    try {
        const { address } = req.body
        if (!address) return res.status(404).json({ msj: "fill in all the fields" })

        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET)

        const user = await users.findOne({ _id: decoded.id })

        const addresses = user.addressBook
        const addressExist = (addresses.find(addresses => addresses.shippingAddress == address))
        addressExist ? res.status(404).json("The shippingAddress already exists") : next()
    } catch {
        res.status(404).json("not found");
    }
};

const validateAddressID = async (req, res, next) => {
    try {
        const { idAddress } = req.params;

        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET)

        const user = await users.findOne({ _id: decoded.id })

        const addresses = user.addressBook
        const idExist = (addresses.find(addresses => addresses.id == idAddress))
        !idExist ? res.status(404).send("thes id address does not exist") : next()


    } catch {
        res.status(404).json("not found");
    }
};

module.exports = {
    validateAddress,
    validateAddressID
}