const express = require('express');
const router = express.Router();
const users = require('../models/users.model')
const middlewares = require('../controllers/users')


router.get('/', function (req, res) {

    const list = async () => await users.find(); //mover
    list()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/register', middlewares.confirmRegistration, (req, res) => {

    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        shippingAddress: req.body.shippingAddress,
        isAdmin: false,
        loggedIn: false,
    };
    
    const createUser = async (newUser) => {   //mover
        const user = new users(newUser);
        const response = await user.save();
        return response;
};
    createUser(newUser)
        .then((response) => res.json(response))
        .catch((err) => res.json(err))

})


router.post('/login', (req, res) => {

    const filter = { username: req.body.username, password: req.body.password };
    const update = { loggedIn: true };

    const login = async () => await users.findOneAndUpdate(filter,update); //mover

    login()
    .then((response) => res.json("session started"))
    .catch((err) => res.json(err))

})


module.exports = router;