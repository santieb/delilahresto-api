const jwt = require('jsonwebtoken');
const users = require('../models/users.models')

const listShippingAddresses = async (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await users.findOne({ _id: decoded.id })
    return user.addressBook
}

const createAddress = async (req) => {
    const { address } = req.body
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)

    const user = await users.findOne({ _id: decoded.id })
    await users.updateOne({ _id: decoded.id },
        {
            $push: { addressBook: {
                shippingAddress: address, 
                id : user.addressBook.length } }
        })
};

const deleteAddress = async (req) => {
    const { idAddress } = req.params;
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)

    await users.updateOne(
        { _id: decoded.id },
        { $pull: { 'addressBook': { id : idAddress } } }
      );
};


module.exports = {
    listShippingAddresses,
    createAddress,
    deleteAddress
};