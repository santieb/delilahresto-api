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
        const user = await users.findOne({ email: req.body.email, password: req.body.password });
        user.isSuspended ? res.status(404).json({ msj: "You are suspended, you cannot log in" }) : next()
    } catch {
        res.status(404).json({ msj: "Email address or password not found. Please try again" })
    }
}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await users.findOne({ _id: decoded.id })
        user.isSuspended ? res.status(404).json({ msj: "You are suspended, you cannot access" }) : next()
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
        adminExist ? next() : res.status(404).json({ msj: 'Not authorized' })
    } catch {
        res.status(404).json({ msj: 'Not authorized' })
    }
}

const validateUserID = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        const user = await users.findOne({ _id: idUser})
        if(user.isAdmin) return res.status(404).json({ msj: 'you cannot suspend an administrator' })
        user.isSuspended ? res.status(404).json({ msj: 'the user is already suspended' }) : next()
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