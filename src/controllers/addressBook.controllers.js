const jwt = require('jsonwebtoken');
const users = require('../models/users.models')
//mejorar querys
const listShippingAddresses = async (req, res) => {
    const idUser = getIdUser(req)
    const user = await users.findOne({ _id: idUser })
    return user.addressBook
}

const createAddress = async (req) => {
    const { address } = req.body
    const idUser = getIdUser(req)

    const user = await users.findOne({ _id: idUser })
    await users.updateOne({ _id: idUser },
        {
            $push: {
                addressBook: {
                    shippingAddress: address,
                    id: user.addressBook.length
                }
            }
        })
}

const deleteAddress = async (req) => {
    const { idAddress } = req.params;
    const idUser = getIdUser(req)

    await users.updateOne(
        { _id: idUser },
        { $pull: { 'addressBook': { id: idAddress } } }
    )
}

const getIdUser = (req) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET)
    const idUser = decoded.id

    return idUser
}


module.exports = {
    listShippingAddresses,
    createAddress,
    deleteAddress
}