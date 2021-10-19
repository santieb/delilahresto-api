require('dotenv').config();
const users = require('../models/users.models')
const jwt = require('jsonwebtoken');

const validateEmail = async (req, res, next) => {
    try {
        const emailExists = await users.exists({ email: req.body.email });
        emailExists ? res.status(404).json("The email is in use") : next()
    } catch {
        res.status(404).json("not found");
    }
}

const confirmLogin = async (req, res, next) => {
    try {
        const searchByEmail = await users.exists({ email: req.body.email, password: req.body.password });
        searchByEmail ? next() : res.status(404).json({ msj: "Email address or password not found. Please try again" })
    } catch {
        res.status(404).json("not found");
    }
}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET)
        const userExist = await users.exists({ _id: decoded.id })
        if(userExist) next()
    }
    catch {
        res.status(404).json({ msj: 'Not authenticated' });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET)
        const adminExist = await users.exists({ _id: decoded.id, isAdmin: true })
        if (adminExist) next()
    } catch {
        res.status(404).json({ msj: 'Not authorized' })
    }
}

const validateUserID = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        const user = await users.findOne({ _id: idUser})
        user.isAdmin ? res.status(404).json({ msj: 'you cannot suspend an administrator' }) : next();
    } catch {
        res.status(404).json({ msj: 'user id does not exist' });
    }
}


module.exports = {
    isAuthenticated,
    isAdmin,
    validateEmail,
    confirmLogin,
    validateUserID
};