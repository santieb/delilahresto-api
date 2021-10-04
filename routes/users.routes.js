const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users.controllers')


router.get('/', function (req, res) {

    controllers.listUsers()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


router.post('/register', controllers.validateEmail, (req, res) => {

    controllers.createUser(req)
        .then((response) => res.json(response))
        .catch((err) => res.json(err))
})


router.post('/login', controllers.confirmLogin, (req, res) => {

    controllers.loginUser(req)
    .then(() => res.json("session started"))
    .catch((err) => res.json(err))
})

module.exports = router;