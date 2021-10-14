require('dotenv').config();
const users = require('../models/users.models')
const jwt = require('jsonwebtoken');

const validateEmail = async (req, res, next) => {
    try {
        const emailExists = await users.exists ({ email: req.body.email });
        emailExists ? res.status(404).json("The email is in use") : next()
    } catch{
        res.status(404).json("not found");
    }
}

const confirmLogin = async (req, res, next) => {
    try {
        const searchByEmail = await users.exists({ email: req.body.email, password: req.body.password });
        searchByEmail ? next() : res.status(404).json({msj: "Email address or password not found. Please try again"})
    } catch{
        res.status(404).json("not found");
    }
}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await users.exists ({ _id: decoded.id })
        user ? next() : res.status(404).json({msj: 'Not authenticated'})
    }
    catch {
        res.status(404).json({msj: 'Not authenticated' }); 
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.SECRET)               
        const user = await users.findOne({ _id: decoded.id })
        user.isAdmin ? next() : res.status(404).json({msj: 'Not authorized' })
    } catch{
        res.status(404).json("not found"); 
    }
} 


module.exports = {                                                             
    isAuthenticated,     
    isAdmin,                                                                 
    validateEmail,     
    confirmLogin                                                                                                                                            
};