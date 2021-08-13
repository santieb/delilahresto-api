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
    req.body.id = id
    req.body.isAdmin = false
    users.push(req.body)
    res.send({msj:'User created'})
})

router.post('/login', middlewares.confirmLogin, (req, res) => {
    const index = users.findIndex(users => req.body.userOrEmail === users.username || req.body.userOrEmail === users.mail);

    res.json({msj:`Hello again, ${users[index].name}`})
})



module.exports = router;