const express = require('express');
const router = express.Router();
const users = require('../models/users')
const middlewares = require('../middlewares/users')

router.get('/', function (req, res) {
    res.json(users)
})

router.post('/', middlewares.confirmRegistration, (req, res) => {
    if(req.body.username === ""){
        res.json({msj: "Fill in all fields"})
    }
    users.push(req.body)
    res.send({msj:'User created'})
})

module.exports = router;