require('dotenv').config();
const users = require('../models/users.models')
const jwt = require('jsonwebtoken');

const listUsers = async () => await users.find();

const createUser = async (req) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password, //encriptar y que sea de al menos 4 caracteres
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        shippingAddress: req.body.shippingAddress,
        isAdmin: false,
    };
    const user = new users(newUser);
    const response = await user.save();
    return response;
};

const loginUser = async (req, res) => {
    const { email } = req.body;
    const user = await users.findOne({ email: email })
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 60 });
    return token
}


module.exports = {                                                             
    listUsers,
    createUser,
    loginUser,                                                                        
};

