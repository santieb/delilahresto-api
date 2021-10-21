require('dotenv').config();
const users = require('../models/users.models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const listUsers = async () => await users.find();

const createUser = async (req) => {
    const { username, password, email, name, phone, addressBook } = req.body
    const passwordHash = await bcrypt.hash(password, 8)
    const newUser = {
        username: username,
        password: passwordHash,
        email: email,
        name: name,
        phone: phone,
        addressBook: addressBook,
    };
    const user = new users(newUser);
    const response = await user.save();
    return response;
};

const loginUser = async (req) => {
    const { email } = req.body;
    const user = await users.findOne({ email: email })
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 60 * 60 * 60 });
    return token
}

const suspendUser = async (req) => {
    const { idUser } = req.params;
    const filter = { _id: idUser };
    const update = { isSuspended: true };

    await users.findOneAndUpdate(filter, update);
}


module.exports = {
    listUsers,
    createUser,
    loginUser,
    suspendUser
};

