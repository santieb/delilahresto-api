const express = require('express');
const router = express.Router();
const users = require('../models/users')
const middlewares = require('../middlewares/users')

router.get('/', function (req, res) {
    res.json(users)
})
let id = 0;

router.post('/signin', middlewares.confirmRegistration, (req, res) => {
    id = id+1
    req.body.id = id
    req.body.isAdmin = false
    users.push(req.body)
    res.send({msj:'User created'})
})

router.post('/login', middlewares.confirmRegistration, (req, res) => {
      
    res.send({msj:'User created'})
})



module.exports = router;