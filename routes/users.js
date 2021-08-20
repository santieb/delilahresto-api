const express = require('express');
const router = express.Router();
const users = require('../models/users')
const middlewares = require('../middlewares/users')


router.get('/', function (req, res) {
    res.json(users)
})


let id = 0;
router.post('/register', middlewares.confirmRegistration, (req, res) => {

    id++
    const {username, name, email, phone, shippingAddress, password} = req.body;
    const newUser = {
        id: id,
        username: username,
        password: password,
        email: email,
        name: name,
        phone: phone,
        shippingAddress: shippingAddress,
        isAdmin: false,
        loggedIn: false,
    };

    users.push(newUser)
    res.json({msj:'User created'})
})


router.post('/login', middlewares.confirmLogin, (req, res) => {

    const index = users.findIndex(users => req.body.userOrEmail === users.username || req.body.userOrEmail === users.mail);

    users[index].loggedIn = true
    res.json({msj:`Hello again, ${users[index].name}`})
})


module.exports = router;