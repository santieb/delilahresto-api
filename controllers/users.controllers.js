require('dotenv').config();
const users = require('../models/users.models')
const jwt = require('jsonwebtoken');

const listUsers = async () => await users.find();

const createUser = async (req) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password, //encriptar
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
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 300 });
    return token
}


//middlewares
const confirmUser = async (req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await users.exists ({ _id: decoded.id })
        user ? next() : res.status(404).json({msj: 'No user found'})
    }
    catch{
        res.status(404).json("not found"); 
    }
}
const isAdmin = async (req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await users.findOne({ _id: decoded.id })
        user.isAdmin ? next() : res.status(404).json("you can't access")
    }catch{
        res.status(404).json("not found"); 
    }
} 

const validateEmail = async (req, res, next) => {
    try{
        const emailExists = await users.exists ({ email: req.body.email });
        emailExists ? res.status(404).json("The email is in use") : next()
    }catch{
        res.status(404).json("not found");
    }
}

const confirmLogin = async (req, res, next) => {
    try{
        const searchByEmail = await users.exists({ email: req.body.email, password: req.body.password });
        searchByEmail ? next() : res.status(404).json({msj: "Email address or password not found. Please try again"})
    }catch{
        res.status(404).json("not found");
    }
}


module.exports = {                                                             
    listUsers,
    createUser,
    loginUser,
    confirmUser,  
    validateEmail,     
    isAdmin,
    confirmLogin                                                                           
};

